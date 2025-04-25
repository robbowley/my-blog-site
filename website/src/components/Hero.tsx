'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { renderBlockEditor } from '../utils/blockEditor';

interface HeroContent {
  title: string;
  subtitle: {
    time: number;
    blocks: Array<{
      type: string;
      data: {
        text: string;
      };
    }>;
    version: string;
  };
  cta_text?: string;
  cta_link?: string;
  background_image?: {
    id: string;
    filename_disk: string;
  };
}

interface ApiError {
  message: string;
  extensions?: {
    code: string;
    reason?: string;
  };
}

interface ApiResponse {
  data?: HeroContent | HeroContent[];  // Can be a single item or an array
  errors?: ApiError[];
}

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        console.log('Fetching hero content...');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8055';
        const response = await fetch(`${apiUrl}/items/hero`);
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const data: ApiResponse = await response.json();
        console.log('Hero data:', data);

        if (data.errors) {
          console.error('API Errors:', data.errors);
          throw new Error(data.errors[0]?.message || 'Unknown API error');
        }
        
        if (data.data) {
          // Handle both array and single item responses
          const heroData = Array.isArray(data.data) ? data.data[0] : data.data;
          console.log('Setting hero content:', heroData);
          setHeroContent(heroData);
        } else {
          console.log('No hero content found in response. Response data:', data);
          setError('No hero content found. Please create a hero entry in Directus.');
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl text-gray-600">Loading hero content...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl text-red-500 mb-4">Error loading hero content</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!heroContent) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-2xl text-gray-600">No hero content available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gray-100">
      {heroContent.background_image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${heroContent.background_image.id}`}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${heroContent.background_image ? 'text-white' : 'text-gray-900'}`}>
          {heroContent.title}
        </h1>
        
        <div className={`text-xl md:text-2xl mb-8 ${heroContent.background_image ? 'text-white' : 'text-gray-600'}`}>
          {heroContent.subtitle && renderBlockEditor(heroContent.subtitle)}
        </div>

        {heroContent.cta_text && heroContent.cta_link && (
          <a
            href={heroContent.cta_link}
            className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors ${
              heroContent.background_image 
                ? 'bg-white text-black hover:bg-gray-100' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {heroContent.cta_text}
          </a>
        )}
      </div>
    </div>
  );
} 
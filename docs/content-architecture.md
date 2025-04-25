# Content Architecture

## Content Types & Structure

### Core Service Content
```yaml
service:
  title: string
  shortDescription: string  # For homepage/preview
  tagline: string          # e.g., "A product & tech MOT for your business"
  keyPoints: string[]      # Bullet points for quick scanning
  detailedContent: string  # For service-specific pages
  callToAction: {
    text: string,
    link: string
  }
```

### Articles/Blog Posts
```yaml
article:
  title: string
  excerpt: string         # For homepage/preview
  content: markdown
  publishDate: date
  author: {
    name: string,
    bio: string,
    image?: string
  }
  tags: string[]
  readingTime: number
```

### Testimonials
```yaml
testimonial:
  quote: string
  author?: string        # Optional for anonymity
  company?: string       # Optional for anonymity
  context: string        # Type of engagement
  serviceArea: string    # Related service
```

### Company Information
```yaml
companyInfo:
  valueProposition: markdown
  capabilities: string[]
  contactDetails: {
    email: string,
    registration: string
  }
```

### Team Profile
```yaml
profile:
  name: string
  role: string
  shortBio: string      # For homepage
  fullBio: markdown     # For about page
  expertise: string[]
```

## Page Layouts

### Homepage Layout
```
┌──────────────────────┐
│      Hero Value      │
│     Proposition      │
├──────────────────────┤
│    Core Services     │
│  (Preview Cards)     │
├──────────────────────┤
│ Featured Testimonial │
├──────────────────────┤
│   Latest Articles    │
│    (2-3 recent)      │
├──────────────────────┤
│    Capabilities      │
│      Overview        │
├──────────────────────┤
│  Call to Action +    │
│  Contact Preview     │
└──────────────────────┘
```

Key homepage principles:
- Progressive disclosure of information
- Clear value proposition above the fold
- Scannable service previews with clear CTAs
- Social proof via testimonial
- Fresh content via latest articles
- Clear next steps

### Service Page Layout
```
┌──────────────────────┐
│   Service Header     │
├──────────────────────┤
│    Key Benefits      │
├──────────────────────┤
│ Detailed Description │
├──────────────────────┤
│ Related Testimonial  │
├──────────────────────┤
│  Related Articles    │
└──────────────────────┘
```

### Blog/Articles Section
```
┌──────────────────────┐
│  Featured Article    │
├──────────────────────┤
│                      │
│   Article Grid       │
│                      │
├──────────────────────┤
│    Categories +      │
│      Filters        │
└──────────────────────┘
```

## Content Relationships

- Services link to related articles and testimonials
- Articles can be tagged with related services
- Testimonials can be associated with specific services
- Homepage dynamically features latest/most relevant content

## Content Management Workflow

### Regular Updates Needed For:
- Blog posts/articles
- Testimonials
- Service descriptions (occasional)

### Static/Infrequent Updates:
- Core service structure
- Company information
- Team profiles
- Capability lists

## Next Steps

1. Define component library needed to support these layouts
2. Plan responsive behavior for each layout
3. Design content entry/editing workflow
4. Consider SEO optimization for each content type 
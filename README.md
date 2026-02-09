# Debug Labs

An experimental playground showcasing creative coding experiments and interactive projects.

## About

Debug Labs is a curated collection of web-based experiments, visualizations, and interactive demos. Built with SvelteKit, it provides a clean, modern interface for browsing and experiencing creative coding projects with tag-based filtering and deep linking support.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd labs.debug.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
labs.debug.io/
├── src/
│   ├── routes/
│   │   ├── +page.svelte           # Home page with project grid
│   │   ├── +layout.svelte          # Root layout
│   │   └── project/
│   │       └── [slug]/
│   │           └── +page.svelte    # Project detail page with iframe
│   ├── lib/                        # Shared components
│   └── app.css                     # Global styles
├── static/
│   ├── json/
│   │   └── projects.json           # Project metadata
│   ├── img/                        # Images and assets
│   └── dist/                       # Built project files
└── tailwind.config.js              # Tailwind configuration
```

## Projects JSON Structure

Projects are defined in `static/json/projects.json`. Each project requires the following fields:

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "description": "Brief description of the project",
  "img": "/img/projects/thumbnail.png",
  "tags": ["Tag1", "Tag2", "Tag3"]
}
```

**Optional fields:**
```json
{
  "iframe": "project-folder/index.html",
  "gitrepo": "https://github.com/user/repo",
  "download": "/downloads/project.zip"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | ✅ | Unique identifier for URL routing (e.g., `/project/slug`) |
| `title` | string | ✅ | Display name of the project |
| `description` | string | ✅ | Short description shown on cards and in metadata |
| `img` | string | ✅ | Path to thumbnail image |
| `iframe` | string | ❌ | Relative path to project iframe content (defaults to `/dist/[slug]/index.html` if omitted) |
| `gitrepo` | string | ❌ | GitHub repository URL (omit if not applicable) |
| `download` | string | ❌ | Download link (omit if not applicable) |
| `tags` | array | ✅ | Array of tag strings for filtering |

### Iframe Path Handling

- If `iframe` is provided, it will be prefixed with `/dist/` automatically
- Example: `"iframe": "my-project/index.html"` becomes `/dist/my-project/index.html`
- Query parameters are supported: `"iframe": "project/index.html?type=variant"`
- If `iframe` is omitted, defaults to `/dist/[slug]/index.html`

### Adding a New Project

1. Build your project and place it in `static/dist/[project-slug]/`
2. Add a thumbnail image to `static/img/projects/`
3. Add a new entry to `static/json/projects.json`
4. The project will automatically appear on the home page

## Features

### Tag Filtering
- Click tags to filter projects
- Multiple tags can be selected
- URL updates with query parameters (e.g., `?tag=WebGL&tag=React`)
- Deep links with pre-selected tags are supported

### Project Navigation
- Previous/Next navigation between projects
- Tag links in project headers navigate to filtered home view
- Click logo to return home and clear filters

### Dark Mode
- Automatic dark mode support
- Logo and UI elements adapt to theme
- Tag colors use pink accent in dark mode

## Technology Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS v3
- **Fonts**: Avenir LT Std
- **Deployment**: Cloudflare Pages (adapter-cloudflare)

## License

[Add your license information here]

## Contact

Part of the [DEBUG](https://debug.io) family of projects.

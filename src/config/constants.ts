// src/config/constants.ts
export const NEWS_ITEMS = [
    {
        id: 1,
        title: "CarbonFi Launches Revolutionary Carbon Credit Trading Platform",
        excerpt: "A groundbreaking platform that brings transparency and efficiency to carbon credit trading through blockchain technology.",
        content: `
      <p>CarbonFi is proud to announce the launch of our revolutionary carbon credit trading platform...</p>
      <!-- Add full article content here -->
    `,
        category: "Platform Update",
        date: "March 15, 2024",
        image: "/images/news-1.jpg",
        slug: "carbonfi-platform-launch",
        tags: ["Platform", "Launch", "Trading"]
    },
    // ... other news items
] as const;

export const CATEGORIES = [
    "All",
    "Platform Update",
    "Partnership",
    "Technology",
    "Community"
] as const;
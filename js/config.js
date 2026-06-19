"use strict";

window.SITE_CONFIG = {
    siteUrl: "https://rarogads.com",
    domain: "rarogads.com",
    companyName: "Rarog Group, s. r. o.",
    brandName: "Rarog Group",
    legalForm: "Spol. s r. o.",
    registeredDate: "28.09.2012",

    companyDetails: {
        registrationNumber: "46836454",
        taxId: "2023606112",
        vatId: "SK2023606112",
        registration:
            "Obchodny register Mestskeho sudu Bratislava III, oddiel: Sro, vlozka c. 84407/B",
        businessFocus:
            "Marketing consulting, Google Ads services, advertising reporting, campaign monitoring, account management review, and performance data synchronization."
    },

    email: {
        value: "support@rarogads.com",
        href: "mailto:support@rarogads.com",
        label: "Email Rarog Group"
    },

    address: {
        full: "Černockého 9983/5A, Bratislava - mestská časť Rača, 831 53, Slovenská republika",
        mapsUrl:
            "https://www.google.com/maps/search/?api=1&query=Černockého%209983%2F5A%2C%20Bratislava%20Rača%20831%2053%2C%20Slovenská%20republika",
        label: "Open Rarog Group address in Google Maps"
    },

    assets: {
        logo: "./assets/icons/logo.svg",
        logoMark: "./assets/icons/logo-mark.svg",
        favicon: "./assets/icons/favicon.svg"
    },

    navigation: [
        {
            label: "Home",
            homeHref: "#home",
            pageHref: "index.html#home"
        },
        {
            label: "About",
            homeHref: "#about",
            pageHref: "index.html#about"
        },
        {
            label: "Services",
            homeHref: "#services",
            pageHref: "index.html#services",
            hasDropdown: true
        },
        {
            label: "Process",
            homeHref: "#process",
            pageHref: "index.html#process"
        },
        {
            label: "Approach",
            homeHref: "#approach",
            pageHref: "index.html#approach"
        },
        {
            label: "Contact",
            homeHref: "#contact",
            pageHref: "index.html#contact"
        }
    ],

    homeSections: [
        {
            id: "home",
            label: "Hero"
        },
        {
            id: "about",
            label: "About"
        },
        {
            id: "services",
            label: "Services"
        },
        {
            id: "growth",
            label: "Growth"
        },
        {
            id: "process",
            label: "Process"
        },
        {
            id: "approach",
            label: "Approach"
        },
        {
            id: "contact",
            label: "Contact"
        }
    ],

    services: [
        {
            id: "google-ads",
            title: "Google Ads",
            shortTitle: "Google Ads",
            href: "google-ads.html",
            icon: "badge-dollar-sign",
            heroImage: "./assets/images/google-ads-hero.jpg",
            detailImage: "./assets/images/google-ads-detail.jpg",
            kicker: "Paid search strategy",
            summary:
                "Launch structured paid search campaigns with clearer targeting, stronger intent alignment, and better tracking.",
            pageTitle: "Google Ads Campaign Strategy",
            pageIntro:
                "Rarog Group builds paid search systems focused on intent, structure, landing page alignment, and measurable campaign direction.",
            improves: [
                "Campaign structure and ad group clarity",
                "Search intent and keyword alignment",
                "Ad copy relevance and message consistency",
                "Budget visibility and performance tracking",
                "Landing page connection and conversion paths"
            ],
            matters:
                "Paid search can move quickly, but without structure it can also waste budget quickly. A clear Google Ads setup helps campaigns become easier to measure, refine, and scale responsibly.",
            method: [
                "Map commercial search intent before building campaigns.",
                "Structure campaigns around services, audiences, and conversion goals.",
                "Align ad copy with landing page expectations.",
                "Set tracking foundations before optimization decisions.",
                "Refine based on performance signals, not assumptions."
            ],
            deliverables: [
                "Search campaign planning",
                "Keyword and intent mapping",
                "Ad copy direction",
                "Conversion tracking recommendations",
                "Landing page alignment review",
                "Optimization roadmap"
            ],
            faq: [
                {
                    question: "Can Google Ads guarantee leads?",
                    answer:
                        "No. Rarog Group does not promise guaranteed leads or revenue. Campaign performance can vary based on budget, market demand, competition, website quality, offer strength, and platform changes."
                },
                {
                    question: "Is Google Ads useful for new businesses?",
                    answer:
                        "It can be useful when the offer, targeting, budget, and landing page are prepared properly. The goal is to build a clear campaign structure before scaling spend."
                }
            ]
        },

        {
            id: "seo-optimization",
            title: "SEO Optimization",
            shortTitle: "SEO",
            href: "seo-optimization.html",
            icon: "search-check",
            heroImage: "./assets/images/seo-optimization-hero.jpg",
            detailImage: "./assets/images/seo-optimization-detail.jpg",
            kicker: "Organic visibility",
            summary:
                "Improve technical structure, page relevance, and search visibility through cleaner optimization.",
            pageTitle: "SEO Optimization for Stronger Search Visibility",
            pageIntro:
                "Rarog Group improves website structure, content relevance, metadata, crawlability, and search signals to support long-term organic visibility.",
            improves: [
                "Technical SEO foundations",
                "On-page content structure",
                "Metadata and page relevance",
                "Internal linking clarity",
                "Keyword mapping and search intent"
            ],
            matters:
                "SEO is not only about keywords. Strong organic visibility depends on technical clarity, useful content, crawlable structure, and pages that match real search intent.",
            method: [
                "Review technical visibility and crawl barriers.",
                "Map keywords to relevant pages and user intent.",
                "Improve headings, metadata, and page structure.",
                "Strengthen internal linking and content hierarchy.",
                "Create an optimization plan that can be maintained."
            ],
            deliverables: [
                "Technical SEO review",
                "Metadata direction",
                "Keyword mapping",
                "On-page optimization guidance",
                "Content structure recommendations",
                "Search visibility roadmap"
            ],
            faq: [
                {
                    question: "Can SEO guarantee first-page rankings?",
                    answer:
                        "No. Rankings depend on competition, search engine updates, content quality, technical health, authority, and market conditions. Rarog Group focuses on improving structure and visibility signals."
                },
                {
                    question: "How fast does SEO work?",
                    answer:
                        "SEO is usually a gradual process. Improvements may support visibility over time, but timing varies by website condition, competition, content quality, and search demand."
                }
            ]
        },

        {
            id: "social-media-marketing",
            title: "Social Media Marketing",
            shortTitle: "Social Media",
            href: "social-media-marketing.html",
            icon: "megaphone",
            heroImage: "./assets/images/social-media-marketing-hero.jpg",
            detailImage: "./assets/images/social-media-marketing-detail.jpg",
            kicker: "Audience alignment",
            summary:
                "Plan and shape social content and paid campaigns that support brand awareness and audience engagement.",
            pageTitle: "Social Media Marketing with Clear Brand Direction",
            pageIntro:
                "Rarog Group helps businesses organize social media presence through content planning, campaign direction, audience targeting, and brand consistency.",
            improves: [
                "Content planning and posting structure",
                "Paid social campaign direction",
                "Audience targeting clarity",
                "Creative message consistency",
                "Reporting and performance signals"
            ],
            matters:
                "Social media works best when creative direction, audience understanding, and campaign structure support the same business goal. Random posting rarely creates a strong digital presence.",
            method: [
                "Clarify audience segments and brand positioning.",
                "Plan content themes around business goals.",
                "Shape paid campaign structure when needed.",
                "Align creative assets with platform expectations.",
                "Review engagement and campaign signals."
            ],
            deliverables: [
                "Content direction",
                "Campaign planning",
                "Audience targeting outline",
                "Creative messaging guidance",
                "Posting structure recommendations",
                "Performance review direction"
            ],
            faq: [
                {
                    question: "Do you guarantee engagement or sales from social media?",
                    answer:
                        "No. Social performance depends on audience behavior, content quality, budget, competition, platform algorithms, and market demand."
                },
                {
                    question: "Is social media only for brand awareness?",
                    answer:
                        "Not only. It can support awareness, trust, engagement, remarketing, and traffic, but the strategy should match the business goal."
                }
            ]
        },

        {
            id: "web-design",
            title: "Web Design",
            shortTitle: "Web Design",
            href: "web-design.html",
            icon: "layout-template",
            heroImage: "./assets/images/web-design-hero.jpg",
            detailImage: "./assets/images/web-design-detail.jpg",
            kicker: "Conversion-aware websites",
            summary:
                "Build clean, responsive, conversion-aware website experiences for modern businesses.",
            pageTitle: "Web Design for Clearer Digital Experiences",
            pageIntro:
                "Rarog Group creates clean, responsive, conversion-aware website structures that help users understand offers, navigate pages, and take action with less friction.",
            improves: [
                "Responsive page structure",
                "Visual hierarchy and readability",
                "Landing page clarity",
                "Mobile usability",
                "CTA and contact flow"
            ],
            matters:
                "A website often becomes the center of digital campaigns. If the structure is confusing, even strong traffic can fail to convert. Clear design supports stronger user decisions.",
            method: [
                "Define page goals and conversion paths.",
                "Build responsive layouts around real user behavior.",
                "Create hierarchy with typography, spacing, and content flow.",
                "Design CTAs and forms with clarity.",
                "Keep the visual system polished and maintainable."
            ],
            deliverables: [
                "Website structure direction",
                "Landing page layout planning",
                "Responsive design guidance",
                "CTA and form flow recommendations",
                "UX clarity review",
                "Visual hierarchy system"
            ],
            faq: [
                {
                    question: "Is web design only about how the site looks?",
                    answer:
                        "No. Visual style matters, but strong web design also includes structure, usability, content hierarchy, responsiveness, and conversion flow."
                },
                {
                    question: "Do service pages need different content?",
                    answer:
                        "Yes. Service pages should follow one design system, but each page needs content that matches the specific service, audience, and search intent."
                }
            ]
        },

        {
            id: "conversion-boost",
            title: "Conversion Boost",
            shortTitle: "Conversion",
            href: "conversion-boost.html",
            icon: "mouse-pointer-click",
            heroImage: "./assets/images/conversion-boost-hero.jpg",
            detailImage: "./assets/images/conversion-boost-detail.jpg",
            kicker: "Friction reduction",
            summary:
                "Improve landing pages, CTAs, forms, and user journeys to reduce friction and support stronger action.",
            pageTitle: "Conversion Boost for Better User Action",
            pageIntro:
                "Rarog Group reviews user journeys, CTAs, landing page structure, forms, and messaging clarity to support stronger conversion paths.",
            improves: [
                "CTA clarity and placement",
                "Landing page message structure",
                "Form usability",
                "User journey flow",
                "Analytics and conversion signals"
            ],
            matters:
                "Traffic alone is not enough. Conversion-focused improvements help pages become clearer, easier to use, and better aligned with user intent.",
            method: [
                "Review current conversion paths and friction points.",
                "Clarify CTA hierarchy and page messaging.",
                "Improve form structure and field flow.",
                "Align page sections with user decision stages.",
                "Use analytics signals to guide refinement."
            ],
            deliverables: [
                "CTA review",
                "Landing page structure recommendations",
                "Form improvement direction",
                "User journey notes",
                "Messaging clarity improvements",
                "Conversion signal checklist"
            ],
            faq: [
                {
                    question: "Can conversion optimization guarantee more sales?",
                    answer:
                        "No. It is designed to reduce friction and improve clarity, but results vary based on traffic quality, offer strength, audience behavior, competition, and website condition."
                },
                {
                    question: "Is conversion work useful without paid ads?",
                    answer:
                        "Yes. It can support organic, social, referral, and direct traffic because it improves how users move through the website."
                }
            ]
        },

        {
            id: "local-seo",
            title: "Local SEO",
            shortTitle: "Local SEO",
            href: "local-seo.html",
            icon: "map-pin-check",
            heroImage: "./assets/images/local-seo-hero.jpg",
            detailImage: "./assets/images/local-seo-detail.jpg",
            kicker: "Location visibility",
            summary:
                "Strengthen local visibility through location-focused optimization and business profile improvements.",
            pageTitle: "Local SEO for Location-Based Visibility",
            pageIntro:
                "Rarog Group supports local search visibility through Google Business Profile direction, location-focused content, citations, and trust signals.",
            improves: [
                "Google Business Profile clarity",
                "Local landing page relevance",
                "Location-based search visibility",
                "Citation consistency",
                "Local trust and service area signals"
            ],
            matters:
                "Local search depends on relevance, proximity, prominence, and trust signals. A structured local SEO approach helps businesses present clearer information to nearby searchers.",
            method: [
                "Review local search presence and business information.",
                "Improve profile clarity and service details.",
                "Shape location-focused website content.",
                "Support citation consistency and trust signals.",
                "Create a maintainable local visibility plan."
            ],
            deliverables: [
                "Google Business Profile recommendations",
                "Local page content direction",
                "Citation consistency checklist",
                "Service area content guidance",
                "Local trust signal review",
                "Local visibility roadmap"
            ],
            faq: [
                {
                    question: "Can Local SEO guarantee map rankings?",
                    answer:
                        "No. Map visibility depends on competition, location, profile quality, reviews, relevance, proximity, and search platform changes."
                },
                {
                    question: "Is Local SEO useful for service businesses?",
                    answer:
                        "Yes. It can help service businesses strengthen location-based relevance, profile clarity, and local search presentation."
                }
            ]
        },

        {
            id: "google-ads-api-use-case",
            title: "Google Ads API Use Case",
            shortTitle: "API Use Case",
            href: "google-ads-api-use-case.html",
            icon: "workflow",
            heroImage: "./assets/images/google-ads-hero.jpg",
            detailImage: "./assets/images/google-ads-detail.jpg",
            kicker: "Authorized account workflow",
            summary:
                "Reporting, monitoring, and authorized account data workflow for Google Ads support and performance synchronization.",
            pageTitle: "Google Ads API Use Case",
            pageIntro:
                "Rarog Group uses a Google Ads API workflow to support reporting, campaign monitoring, account management review, and performance data synchronization for authorized advertising accounts.",
            improves: [
                "Reporting dashboards and account visibility",
                "Campaign monitoring and delivery review",
                "Authorized account management support",
                "Budget and performance synchronization",
                "Optimization review and internal reporting"
            ],
            matters:
                "The workflow is designed for authorized Google Ads accounts and supports business reporting needs without requesting Google Ads passwords through the website.",
            method: [
                "Use authorized Google Ads access for reporting workflows.",
                "Review campaign, ad group, keyword, and performance data.",
                "Synchronize core spend and conversion indicators.",
                "Support internal account review and client communication.",
                "Limit processing to reporting, monitoring, and account support."
            ],
            deliverables: [
                "Reporting dashboard inputs",
                "Campaign monitoring notes",
                "Account review support",
                "Performance synchronization structure",
                "Internal reporting workflow"
            ],
            faq: [
                {
                    question: "Why does Rarog Group need Google Ads API access?",
                    answer:
                        "The workflow supports authorized reporting, campaign monitoring, account review, and performance data synchronization for Google Ads service delivery."
                },
                {
                    question: "Does the API workflow create campaigns automatically?",
                    answer:
                        "The current use case is focused on reporting, monitoring, account review, and performance synchronization rather than automated campaign creation through a public tool."
                }
            ]
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        }
    ],

    pageMeta: {
        "index.html": {
            title: "Rarog Group | Digital Marketing & Advertising Agency in Bratislava",
            description:
                "Rarog Group, s. r. o. is a Bratislava-based digital marketing and advertising agency focused on Google Ads, SEO, social media marketing, web design, conversion optimization, and local SEO.",
            canonical: "https://rarogads.com/"
        },
        "google-ads.html": {
            title: "Google Ads Strategy | Rarog Group",
            description:
                "Structured Google Ads campaign planning, paid search strategy, intent mapping, landing page alignment, and conversion tracking direction from Rarog Group.",
            canonical: "https://rarogads.com/google-ads.html"
        },
        "seo-optimization.html": {
            title: "SEO Optimization | Rarog Group",
            description:
                "SEO optimization for stronger technical structure, metadata clarity, content relevance, crawlability, and long-term search visibility.",
            canonical: "https://rarogads.com/seo-optimization.html"
        },
        "social-media-marketing.html": {
            title: "Social Media Marketing | Rarog Group",
            description:
                "Social media marketing strategy, content planning, paid social direction, audience targeting, creative messaging, and reporting support.",
            canonical: "https://rarogads.com/social-media-marketing.html"
        },
        "web-design.html": {
            title: "Web Design | Rarog Group",
            description:
                "Responsive, clean, conversion-aware web design direction for modern businesses that need stronger digital experiences and clearer contact flows.",
            canonical: "https://rarogads.com/web-design.html"
        },
        "conversion-boost.html": {
            title: "Conversion Boost | Rarog Group",
            description:
                "Conversion optimization direction for landing pages, CTAs, forms, user journeys, analytics signals, and clearer action paths.",
            canonical: "https://rarogads.com/conversion-boost.html"
        },
        "local-seo.html": {
            title: "Local SEO | Rarog Group",
            description:
                "Local SEO support for Google Business Profile clarity, local landing pages, citation consistency, service area content, and map visibility signals.",
            canonical: "https://rarogads.com/local-seo.html"
        },
        "google-ads-api-use-case.html": {
            title: "Google Ads API Use Case | Rarog Group",
            description:
                "Google Ads API use case for Rarog Group: authorized advertising reporting, campaign monitoring, account management review, and performance data synchronization.",
            canonical: "https://rarogads.com/google-ads-api-use-case.html"
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Rarog Group",
            description:
                "Read the Privacy Policy for Rarog Group, s. r. o., including information about contact form data, cookies, analytics, retention, and user rights.",
            canonical: "https://rarogads.com/privacy-policy.html"
        },
        "terms-of-service.html": {
            title: "Terms of Service | Rarog Group",
            description:
                "Read the Terms of Service for the Rarog Group website, marketing service information, third-party platforms, intellectual property, and liability limitations.",
            canonical: "https://rarogads.com/terms-of-service.html"
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Rarog Group",
            description:
                "Read the Cookie Policy for Rarog Group, including essential cookies, analytics cookies, preference cookies, and cookie management options.",
            canonical: "https://rarogads.com/cookie-policy.html"
        }
    },

    footer: {
        description:
            "Rarog Group, s. r. o. supports Google Ads services, marketing consulting, campaign reporting, website improvement, and performance-focused digital communication.",
        copyright:
            "© 2026 Rarog Group, s. r. o. All rights reserved."
    },

    cookieBanner: {
        storageKey: "rarog_cookie_choice_v1",
        title: "Privacy preferences",
        text:
            "We use essential cookies to support website functionality and may use limited analytics signals to understand website performance. You can accept or decline non-essential cookies.",
        acceptText: "Accept",
        declineText: "Decline"
    },

    form: {
        successMessage:
            "Thank you — your request was sent to Rarog Group. The team will review it and respond by email.",
        errorMessage:
            "Please complete all required fields and confirm the privacy consent before submitting.",
        requestErrorMessage:
            "We could not send your request right now. Please email Rarog Group directly at support@rarogads.com.",
        submitText: "Send request",
        submittingText: "Sending request...",
        servicesPlaceholder: "Select a service",
        services: [
            "Google Ads",
            "SEO Optimization",
            "Social Media Marketing",
            "Web Design",
            "Conversion Boost",
            "Local SEO",
            "Google Ads API Use Case"
        ]
    },

    noPromiseText:
        "Rarog Group focuses on structure, strategy, visibility, tracking, and optimization. Marketing results can vary based on competition, budget, market demand, website quality, audience behavior, third-party platforms, and ongoing platform changes."
};

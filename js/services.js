"use strict";

(function () {
    const config = window.SITE_CONFIG || {};

    const selectors = {
        header: "[data-site-header]",
        mobileMenu: "[data-mobile-menu]",
        mobileOpen: "[data-mobile-menu-open]",
        mobileClose: "[data-mobile-menu-close]",
        mobileLink: "[data-mobile-menu-link]",
        servicesToggle: "[data-services-toggle]",
        servicesDropdown: "[data-services-dropdown]",
        faqItem: "[data-faq-item]",
        faqButton: "[data-faq-button]",
        cookieBanner: "[data-cookie-banner]",
        cookieAccept: "[data-cookie-accept]",
        cookieDecline: "[data-cookie-decline]",
        cookieTitle: "[data-cookie-title]",
        cookieText: "[data-cookie-text]"
    };

    const state = {
        lastFocusedElement: null,
        dropdownTimer: null
    };

    document.addEventListener("DOMContentLoaded", initServicePage);

    function initServicePage() {
        applyConfigData();
        applyPageMeta();
        initIcons();
        initHeaderState();
        initServicesDropdown();
        initMobileMenu();
        initFaqAccordions();
        initCookieBanner();
        markActiveServiceLinks();
    }

    function qs(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function qsa(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function initIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function getCurrentFileName() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf("/") + 1);
        return fileName || "index.html";
    }

    function normalizeHref(href) {
        if (!href) return "";

        return href
            .replace(window.location.origin, "")
            .replace(window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1), "")
            .replace("./", "")
            .split("#")[0]
            .trim();
    }

    function applyPageMeta() {
        const fileName = getCurrentFileName();
        const meta = config.pageMeta && config.pageMeta[fileName];

        if (!meta) return;

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let descriptionTag = qs('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement("meta");
                descriptionTag.setAttribute("name", "description");
                document.head.appendChild(descriptionTag);
            }

            descriptionTag.setAttribute("content", meta.description);
        }
    }

    function applyConfigData() {
        const email = config.email || {};
        const address = config.address || {};
        const footer = config.footer || {};
        const cookieBanner = config.cookieBanner || {};

        qsa("[data-company-name]").forEach((element) => {
            element.textContent = config.companyName || "Rarog Group, s. r. o.";
        });

        qsa("[data-brand-name]").forEach((element) => {
            element.textContent = config.brandName || "Rarog Group";
        });

        qsa("[data-email-link]").forEach((element) => {
            if (email.href) {
                element.setAttribute("href", email.href);
            }

            if (email.label) {
                element.setAttribute("aria-label", email.label);
            }
        });

        qsa("[data-email-text]").forEach((element) => {
            element.textContent = email.value || "support@rarogads.com";
        });

        qsa("[data-map-link]").forEach((element) => {
            if (address.mapsUrl) {
                element.setAttribute("href", address.mapsUrl);
                element.setAttribute("target", "_blank");
                element.setAttribute("rel", "noopener noreferrer");
            }

            if (address.label) {
                element.setAttribute("aria-label", address.label);
            }
        });

        qsa("[data-address-text]").forEach((element) => {
            element.textContent =
                address.full ||
                "Černockého 9983/5A, Bratislava - mestská časť Rača, 831 53, Slovenská republika";
        });

        qsa("[data-footer-text]").forEach((element) => {
            if (footer.description) {
                element.textContent = footer.description;
            }
        });

        qsa("[data-footer-copy]").forEach((element) => {
            if (footer.copyright) {
                element.textContent = footer.copyright;
            }
        });

        qsa(selectors.cookieTitle).forEach((element) => {
            if (cookieBanner.title) {
                element.textContent = cookieBanner.title;
            }
        });

        qsa(selectors.cookieText).forEach((element) => {
            if (cookieBanner.text) {
                element.textContent = cookieBanner.text;
            }
        });
    }

    function initHeaderState() {
        const header = qs(selectors.header);
        if (!header) return;

        const updateHeader = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    function initServicesDropdown() {
        const toggle = qs(selectors.servicesToggle);
        const dropdown = qs(selectors.servicesDropdown);

        if (!toggle || !dropdown) return;

        const servicesItem = toggle.closest(".desktop-nav__item");

        const openDropdown = () => {
            window.clearTimeout(state.dropdownTimer);
            dropdown.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
        };

        const closeDropdown = () => {
            state.dropdownTimer = window.setTimeout(() => {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            }, 160);
        };

        if (servicesItem) {
            servicesItem.addEventListener("mouseenter", openDropdown);
            servicesItem.addEventListener("mouseleave", closeDropdown);

            servicesItem.addEventListener("focusin", openDropdown);

            servicesItem.addEventListener("focusout", (event) => {
                if (!servicesItem.contains(event.relatedTarget)) {
                    closeDropdown();
                }
            });
        }

        toggle.addEventListener("click", (event) => {
            event.preventDefault();

            const isOpen = dropdown.classList.contains("is-open");

            if (isOpen) {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            } else {
                openDropdown();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.blur();
            }
        });

        document.addEventListener("click", (event) => {
            if (!servicesItem) return;

            if (!servicesItem.contains(event.target)) {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    function initMobileMenu() {
        const menu = qs(selectors.mobileMenu);
        const openButton = qs(selectors.mobileOpen);
        const closeButton = qs(selectors.mobileClose);

        if (!menu || !openButton || !closeButton) return;

        openButton.addEventListener("click", openMobileMenu);
        closeButton.addEventListener("click", closeMobileMenu);

        qsa(selectors.mobileLink, menu).forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        menu.addEventListener("keydown", trapMobileMenuFocus);

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-open")) {
                closeMobileMenu();
            }
        });
    }

    function getFocusableElements(container) {
        return qsa(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            container
        ).filter((element) => {
            const isHidden = element.offsetParent === null && element.tagName !== "BODY";
            return !isHidden;
        });
    }

    function openMobileMenu() {
        const menu = qs(selectors.mobileMenu);
        const openButton = qs(selectors.mobileOpen);

        if (!menu || !openButton) return;

        state.lastFocusedElement = document.activeElement;

        menu.classList.add("is-open");
        document.body.classList.add("menu-open");
        openButton.setAttribute("aria-expanded", "true");

        const focusable = getFocusableElements(menu);

        if (focusable.length) {
            window.setTimeout(() => {
                focusable[0].focus();
            }, 60);
        }
    }

    function closeMobileMenu() {
        const menu = qs(selectors.mobileMenu);
        const openButton = qs(selectors.mobileOpen);

        if (!menu || !openButton) return;

        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        openButton.setAttribute("aria-expanded", "false");

        if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
            window.setTimeout(() => {
                state.lastFocusedElement.focus();
            }, 80);
        }
    }

    function trapMobileMenuFocus(event) {
        if (event.key !== "Tab") return;

        const menu = qs(selectors.mobileMenu);
        if (!menu || !menu.classList.contains("is-open")) return;

        const focusable = getFocusableElements(menu);
        if (!focusable.length) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function initFaqAccordions() {
        const faqItems = qsa(selectors.faqItem);

        if (!faqItems.length) return;

        faqItems.forEach((item, index) => {
            const button = qs(selectors.faqButton, item);

            if (!button) return;

            if (index === 0) {
                openFaqItem(item, button);
            }

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach((otherItem) => {
                    const otherButton = qs(selectors.faqButton, otherItem);

                    if (otherButton) {
                        closeFaqItem(otherItem, otherButton);
                    }
                });

                if (!isOpen) {
                    openFaqItem(item, button);
                }
            });
        });
    }

    function openFaqItem(item, button) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
    }

    function closeFaqItem(item, button) {
        item.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
    }

    function initCookieBanner() {
        const banner = qs(selectors.cookieBanner);
        const acceptButton = qs(selectors.cookieAccept);
        const declineButton = qs(selectors.cookieDecline);

        if (!banner || !acceptButton || !declineButton) return;

        const cookieConfig = config.cookieBanner || {};
        const storageKey = cookieConfig.storageKey || "rarog_cookie_choice_v1";
        const existingChoice = getStorageItem(storageKey);

        if (!existingChoice) {
            window.setTimeout(() => {
                banner.classList.add("is-visible");
            }, 450);
        }

        acceptButton.addEventListener("click", () => {
            setStorageItem(storageKey, "accepted");
            banner.classList.remove("is-visible");
        });

        declineButton.addEventListener("click", () => {
            setStorageItem(storageKey, "declined");
            banner.classList.remove("is-visible");
        });
    }

    function getStorageItem(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function setStorageItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            return false;
        }

        return true;
    }

    function markActiveServiceLinks() {
        const currentFile = normalizeHref(getCurrentFileName());
        const serviceId = document.body.dataset.serviceId || "";

        qsa("a[href]").forEach((link) => {
            const linkFile = normalizeHref(link.getAttribute("href"));

            if (linkFile && linkFile === currentFile) {
                link.classList.add("is-active");
            }
        });

        if (!serviceId) return;

        qsa(`[data-service-link="${serviceId}"]`).forEach((link) => {
            link.classList.add("is-active");
        });
    }
})();
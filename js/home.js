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
        section: "[data-section]",
        sectionLink: "[data-section-link]",
        sideNavLink: "[data-side-nav-link]",
        servicesSwiper: "[data-services-swiper]",
        swiperPrev: "[data-swiper-prev]",
        swiperNext: "[data-swiper-next]",
        swiperPagination: "[data-swiper-pagination]",
        contactForm: "[data-contact-form]",
        formError: "[data-form-error]",
        formSuccess: "[data-form-success]",
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

    document.addEventListener("DOMContentLoaded", initHomePage);

    function initHomePage() {
        applyConfigData();
        injectApiUseCaseLinks();
        injectCompanyDetails();
        applyPageMeta();
        initIcons();
        initHeaderState();
        initSmoothAnchors();
        initServicesDropdown();
        initMobileMenu();
        initSectionTracking();
        initServicesSwiper();
        initContactForm();
        initCookieBanner();
        initApproachSwitcher();
        initFaqAccordion();
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

        const canonical = meta.canonical || getCanonicalUrl(fileName);
        upsertLinkTag("canonical", canonical);
        upsertMetaTag("property", "og:title", meta.title || document.title);
        upsertMetaTag("property", "og:description", meta.description || "");
        upsertMetaTag("property", "og:url", canonical);
    }

    function applyConfigData() {
        const email = config.email || {};
        const address = config.address || {};
        const companyDetails = config.companyDetails || {};
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

        qsa("[data-company-ico]").forEach((element) => {
            element.textContent = companyDetails.registrationNumber || "46836454";
        });

        qsa("[data-company-dic]").forEach((element) => {
            element.textContent = companyDetails.taxId || "2023606112";
        });

        qsa("[data-company-vat]").forEach((element) => {
            element.textContent = companyDetails.vatId || "SK2023606112";
        });

        qsa("[data-company-registration]").forEach((element) => {
            element.textContent =
                companyDetails.registration ||
                "Obchodny register Mestskeho sudu Bratislava III, oddiel: Sro, vlozka c. 84407/B";
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

    function getCanonicalUrl(fileName) {
        const siteUrl = String(config.siteUrl || "https://rarogads.com").replace(/\/+$/, "");
        return fileName === "index.html" ? `${siteUrl}/` : `${siteUrl}/${fileName}`;
    }

    function upsertMetaTag(attributeName, attributeValue, content) {
        if (!content) return;

        let tag = qs(`meta[${attributeName}="${attributeValue}"]`);

        if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attributeName, attributeValue);
            document.head.appendChild(tag);
        }

        tag.setAttribute("content", content);
    }

    function upsertLinkTag(rel, href) {
        if (!href) return;

        let tag = qs(`link[rel="${rel}"]`);

        if (!tag) {
            tag = document.createElement("link");
            tag.setAttribute("rel", rel);
            document.head.appendChild(tag);
        }

        tag.setAttribute("href", href);
    }

    function getApiUseCaseService() {
        return (config.services || []).find(
            (service) => service.href === "google-ads-api-use-case.html"
        );
    }

    function injectApiUseCaseLinks() {
        const apiService = getApiUseCaseService();

        if (!apiService) return;

        const href = `./${apiService.href}`;

        qsa(".services-dropdown__grid").forEach((grid) => {
            if (grid.querySelector(`[href="${href}"], [href="${apiService.href}"]`)) return;

            const link = document.createElement("a");
            link.className = "services-dropdown__link";
            link.href = href;
            link.innerHTML = `
                <span class="services-dropdown__icon">
                    <i data-lucide="${apiService.icon || "workflow"}" aria-hidden="true"></i>
                </span>
                <span>
                    <span class="services-dropdown__title">${apiService.title}</span>
                    <span class="services-dropdown__text">Reporting, monitoring, and authorized account data workflow.</span>
                </span>
            `;

            grid.appendChild(link);
        });

        qsa(".mobile-menu__services-grid").forEach((grid) => {
            if (grid.querySelector(`[href="${href}"], [href="${apiService.href}"]`)) return;

            const link = document.createElement("a");
            link.className = "mobile-menu__service-link";
            link.href = href;
            link.setAttribute("data-mobile-menu-link", "");
            link.innerHTML = `
                <i data-lucide="${apiService.icon || "workflow"}" aria-hidden="true"></i>
                <span>${apiService.title}</span>
                <i class="arrow-icon" data-lucide="arrow-up-right" aria-hidden="true"></i>
            `;

            grid.appendChild(link);
        });

        qsa(".service-mini-nav").forEach((nav) => {
            if (nav.querySelector(`[href="${href}"], [href="${apiService.href}"]`)) return;

            const link = document.createElement("a");
            link.className = "service-mini-nav__link";
            link.href = href;
            link.textContent = "API Use Case";
            nav.appendChild(link);
        });

        qsa(".site-footer__column").forEach((column) => {
            const title = qs(".site-footer__title", column);
            const list = qs(".site-footer__list", column);

            if (!title || !list || title.textContent.trim() !== "Services") return;
            if (list.querySelector(`[href="${href}"], [href="${apiService.href}"]`)) return;

            const item = document.createElement("li");
            item.innerHTML = `<a class="site-footer__link" href="${href}">${apiService.title}</a>`;
            list.appendChild(item);
        });
    }

    function injectCompanyDetails() {
        const companyDetails = config.companyDetails || {};
        const email = config.email || {};
        const footerCardHtml = `
            <div class="site-footer__credentials" data-footer-company-card>
                <p><strong>${config.companyName || "Rarog Group, s. r. o."}</strong></p>
                <p>IČO: ${companyDetails.registrationNumber || "46836454"}</p>
                <p>DIČ: ${companyDetails.taxId || "2023606112"}</p>
                <p>VAT ID: ${companyDetails.vatId || "SK2023606112"}</p>
                <p>${companyDetails.registration || ""}</p>
                <p><a href="${email.href || "mailto:support@rarogads.com"}">${email.value || "support@rarogads.com"}</a></p>
            </div>
        `;

        qsa(".site-footer__brand").forEach((brand) => {
            if (qs("[data-footer-company-card]", brand)) return;
            brand.insertAdjacentHTML("beforeend", footerCardHtml);
        });

        qsa(".legal-contact-card").forEach((card) => {
            if (qs("[data-legal-company-card]", card)) return;

            card.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="legal-contact-card__meta" data-legal-company-card>
                        <p><strong>IČO:</strong> ${companyDetails.registrationNumber || "46836454"}</p>
                        <p><strong>DIČ:</strong> ${companyDetails.taxId || "2023606112"}</p>
                        <p><strong>VAT ID:</strong> ${companyDetails.vatId || "SK2023606112"}</p>
                        <p><strong>Registration:</strong> ${companyDetails.registration || ""}</p>
                    </div>
                `
            );
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

    function getHeaderOffset() {
        const header = qs(selectors.header);
        return header ? header.offsetHeight + 12 : 0;
    }

    function smoothScrollToId(id) {
        const target = document.getElementById(id);
        if (!target) return;

        const targetTop =
            target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();

        window.scrollTo({
            top: Math.max(targetTop, 0),
            behavior: "smooth"
        });
    }

    function initSmoothAnchors() {
        qsa('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || href === "#") return;

                const id = href.slice(1);
                const target = document.getElementById(id);

                if (!target) return;

                event.preventDefault();
                smoothScrollToId(id);

                const mobileMenu = qs(selectors.mobileMenu);
                if (mobileMenu && mobileMenu.classList.contains("is-open")) {
                    closeMobileMenu();
                }
            });
        });
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

            const isHomePage = document.body.dataset.page === "home";

            if (isHomePage) {
                smoothScrollToId("services");
            }

            openDropdown();

            window.setTimeout(() => {
                closeDropdown();
            }, 700);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.blur();
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
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
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

    function initSectionTracking() {
        const sections = qsa(selectors.section);

        if (!sections.length) return;

        const updateActiveLinks = (activeId) => {
            qsa(selectors.sectionLink).forEach((link) => {
                const linkId = link.dataset.sectionLink;
                link.classList.toggle("is-active", linkId === activeId);
            });

            qsa(selectors.sideNavLink).forEach((link) => {
                const linkId = link.dataset.sideNavLink;
                link.classList.toggle("is-active", linkId === activeId);
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleEntries.length) return;

                const activeId = visibleEntries[0].target.dataset.section;
                if (activeId) {
                    updateActiveLinks(activeId);
                }
            },
            {
                root: null,
                threshold: [0.2, 0.35, 0.55],
                rootMargin: "-18% 0px -56% 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));

        qsa(selectors.sideNavLink).forEach((link) => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href");

                if (!href || !href.startsWith("#")) return;

                event.preventDefault();
                smoothScrollToId(href.slice(1));
            });
        });
    }

    function initServicesSwiper() {
        const swiperElement = qs(selectors.servicesSwiper);

        if (!swiperElement || typeof window.Swiper === "undefined") return;

        const paginationElement = qs(selectors.swiperPagination);
        const nextElement = qs(selectors.swiperNext);
        const prevElement = qs(selectors.swiperPrev);

        const swiperOptions = {
            loop: true,
            speed: 720,
            grabCursor: true,
            spaceBetween: 18,
            slidesPerView: 1,
            watchOverflow: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            pagination: paginationElement
                ? {
                    el: paginationElement,
                    clickable: true
                }
                : false,
            navigation:
                nextElement && prevElement
                    ? {
                        nextEl: nextElement,
                        prevEl: prevElement
                    }
                    : false,
            breakpoints: {
                760: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                1180: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        };

        new window.Swiper(swiperElement, swiperOptions);
    }

    function initContactForm() {
        const form = qs(selectors.contactForm);

        if (!form) return;

        const errorBox = qs(selectors.formError, form);
        const successBox = qs(selectors.formSuccess, form);
        const formConfig = config.form || {};
        const submitButton = qs('button[type="submit"]', form);
        const submitLabel = submitButton ? qs("[data-submit-label]", submitButton) : null;
        const defaultSubmitText =
            formConfig.submitText ||
            (submitLabel ? submitLabel.textContent.trim() : submitButton ? submitButton.textContent.trim() : "Send request");
        const submittingText = formConfig.submittingText || "Sending request...";

        const fields = qsa("input, select, textarea", form);

        fields.forEach((field) => {
            field.addEventListener("input", () => {
                clearFieldError(field);
                hideFormMessage(errorBox);
            });

            field.addEventListener("change", () => {
                clearFieldError(field);
                hideFormMessage(errorBox);
            });
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            hideFormMessage(errorBox);
            hideFormMessage(successBox);

            const isValid = validateForm(form);

            if (!isValid) {
                showFormMessage(
                    errorBox,
                    formConfig.errorMessage ||
                    "Please complete all required fields and confirm the privacy consent before submitting."
                );
                focusFirstInvalidField(form);
                return;
            }

            setSubmitButtonState(submitButton, submitLabel, true, submittingText);

            try {
                const response = await fetch("contact.php", {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                let payload = null;

                try {
                    payload = await response.json();
                } catch (error) {
                    payload = null;
                }

                if (response.ok && payload && payload.success) {
                    showFormMessage(
                        successBox,
                        payload.message || formConfig.successMessage || "Thank you — your request was sent to Rarog Group. The team will review it and respond by email."
                    );

                    form.reset();
                    fields.forEach((field) => {
                        clearFieldError(field);
                    });
                } else {
                    showFormMessage(
                        errorBox,
                        (payload && payload.message) ||
                        formConfig.requestErrorMessage ||
                        "We could not send your request right now. Please email Rarog Group directly at support@rarogads.com."
                    );
                }
            } catch (error) {
                showFormMessage(
                    errorBox,
                    formConfig.requestErrorMessage ||
                    "We could not send your request right now. Please email Rarog Group directly at support@rarogads.com."
                );
            } finally {
                setSubmitButtonState(submitButton, submitLabel, false, defaultSubmitText);
            }
        });
    }

    function setSubmitButtonState(button, label, isSubmitting, text) {
        if (!button) return;

        button.disabled = isSubmitting;

        if (label) {
            label.textContent = text;
            return;
        }

        button.textContent = text;
    }

    function focusFirstInvalidField(form) {
        const invalidField = qsa("[required]", form).find((field) => field.getAttribute("aria-invalid") === "true");

        if (invalidField && typeof invalidField.focus === "function") {
            invalidField.focus();
        }
    }

    function validateForm(form) {
        const requiredFields = qsa("[required]", form);
        let isValid = true;

        requiredFields.forEach((field) => {
            const valid = validateField(field);

            if (!valid) {
                isValid = false;
                setFieldError(field);
            } else {
                clearFieldError(field);
            }
        });

        return isValid;
    }

    function validateField(field) {
        if (field.type === "checkbox") {
            return field.checked;
        }

        const value = String(field.value || "").trim();

        if (!value) return false;

        if (field.type === "email") {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (field.type === "tel") {
            return value.replace(/[^\d+]/g, "").length >= 7;
        }

        return true;
    }

    function setFieldError(field) {
        field.classList.add("is-error");

        const label = field.closest("label");
        if (label) {
            label.classList.add("is-error");
        }

        field.setAttribute("aria-invalid", "true");
    }

    function clearFieldError(field) {
        field.classList.remove("is-error");

        const label = field.closest("label");
        if (label) {
            label.classList.remove("is-error");
        }

        field.removeAttribute("aria-invalid");
    }

    function showFormMessage(element, message) {
        if (!element) return;

        element.textContent = message;
        element.classList.add("is-visible");
    }

    function hideFormMessage(element) {
        if (!element) return;

        element.textContent = "";
        element.classList.remove("is-visible");
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

    function initApproachSwitcher() {
        const section =
            document.querySelector(".approach-lens") ||
            document.querySelector(".approach-switch");

        if (!section) return;

        const tabs = Array.from(section.querySelectorAll("[data-approach-tab]"));
        const panels = Array.from(section.querySelectorAll("[data-approach-panel]"));

        if (!tabs.length || !panels.length) return;

        const activateTab = (target) => {
            tabs.forEach((tab) => {
                const isActive = tab.dataset.approachTab === target;

                tab.classList.toggle("is-active", isActive);
                tab.setAttribute("aria-selected", String(isActive));
            });

            panels.forEach((panel) => {
                const isActive = panel.dataset.approachPanel === target;

                panel.classList.toggle("is-active", isActive);

                if (isActive) {
                    panel.removeAttribute("hidden");
                } else {
                    panel.setAttribute("hidden", "");
                }
            });

            if (window.lucide && typeof window.lucide.createIcons === "function") {
                window.lucide.createIcons();
            }
        };

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                activateTab(tab.dataset.approachTab);
            });
        });

        const activeTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
        activateTab(activeTab.dataset.approachTab);
    }

    document.addEventListener("DOMContentLoaded", initApproachSwitcher);

    function setStorageItem(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            return false;
        }

        return true;
    }

    function initFaqAccordion() {
        const accordion = document.querySelector("[data-faq-accordion]");

        if (!accordion) return;

        const items = Array.from(accordion.querySelectorAll(".home-faq__item"));

        items.forEach((item) => {
            const button = item.querySelector(".home-faq__button");
            const panel = item.querySelector(".home-faq__panel");

            if (!button || !panel) return;

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                items.forEach((currentItem) => {
                    const currentButton = currentItem.querySelector(".home-faq__button");
                    const currentPanel = currentItem.querySelector(".home-faq__panel");

                    currentItem.classList.remove("is-open");

                    if (currentButton) {
                        currentButton.setAttribute("aria-expanded", "false");
                    }

                    if (currentPanel) {
                        currentPanel.hidden = true;
                    }
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                    panel.hidden = false;
                }
            });
        });
    }
})();

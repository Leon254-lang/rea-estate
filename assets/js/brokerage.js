(function () {
  "use strict";

  const agents = {
    "walter-white": {
      name: "Walter White",
      role: "Sales & Investment Consultant",
      image: "assets/img/team/team-1.jpg",
      areas: ["Westlands", "Kilimani", "Riverside"],
      languages: ["English", "Swahili"],
      specialties: ["Luxury", "Commercial", "Residential"],
      bio: "Walter helps buyers and property investors compare Nairobi neighborhoods, evaluate residential and commercial opportunities, and plan their next steps with a clear understanding of their goals.",
      listings: [
        { name: "678 Kilimani Crescent", price: "KSh 300,000 / month", type: "For rent", image: "assets/img/properties/property-5.jpg" }
      ],
      sales: ["Sample sale · Westlands apartment", "Sample sale · Kilimani residence"]
    },
    "sarah-jhonson": {
      name: "Sarah Jhonson",
      role: "Rental & Relocation Consultant",
      image: "assets/img/team/team-2.jpg",
      areas: ["Kilimani", "Lavington", "Karen"],
      languages: ["English", "Swahili", "French"],
      specialties: ["Rentals", "Residential", "Relocation"],
      bio: "Sarah supports renters and relocating households as they compare homes, neighborhoods, and rental terms across Nairobi. She helps clients organize their search around practical needs and preferred timelines.",
      listings: [
        { name: "204 Mount Kilimani Heights", price: "KSh 120,000 / month", type: "For rent", image: "assets/img/properties/property-1.jpg" },
        { name: "117 Lavington Lane", price: "KSh 650,000 / month", type: "For rent", image: "assets/img/properties/property-4.jpg" }
      ],
      sales: ["Sample lease · Lavington family home", "Sample lease · Kilimani apartment"]
    },
    "william-anderson": {
      name: "William Anderson",
      role: "Sales & Commercial Consultant",
      image: "assets/img/team/team-3.jpg",
      areas: ["Karen", "Westlands", "Lavington"],
      languages: ["English", "Swahili"],
      specialties: ["Commercial", "Luxury", "Residential"],
      bio: "William works with home buyers and commercial property clients across Nairobi. His sample portfolio highlights neighborhood comparisons, property viewings, and purchase planning.",
      listings: [
        { name: "711 Karen Drive", price: "KSh 5,800,000", type: "For sale", image: "assets/img/properties/property-3.jpg" }
      ],
      sales: ["Sample sale · Karen residence", "Sample sale · Ngong Road property"]
    }
  };

  const propertyCards = Array.from(document.querySelectorAll("[data-property-card]"));
  const filterForm = document.querySelector("#property-filters");
  if (filterForm && propertyCards.length) {
    const searchInput = document.querySelector("#listing-search");
    const typeInput = document.querySelector("#listing-type");
    const minInput = document.querySelector("#price-min");
    const maxInput = document.querySelector("#price-max");
    const pendingInput = document.querySelector("#pending-only");
    const priceDropInput = document.querySelector("#price-drop-only");
    const openHouseInput = document.querySelector("#open-house-only");
    const resultCount = document.querySelector("#property-result-count");
    const noResults = document.querySelector("#no-property-results");
    const initialSearch = new URLSearchParams(window.location.search).get("search");
    if (initialSearch && searchInput) searchInput.value = initialSearch;

    const updateProperties = () => {
      const search = (searchInput.value || "").trim().toLocaleLowerCase();
      const type = typeInput.value;
      const min = minInput.value === "" ? null : Number(minInput.value);
      const max = maxInput.value === "" ? null : Number(maxInput.value);
      let visible = 0;

      propertyCards.forEach((card) => {
        const text = [
          card.dataset.neighborhood,
          card.dataset.schoolArea,
          card.dataset.agent,
          card.textContent
        ].join(" ").toLocaleLowerCase();
        const price = Number(card.dataset.price);
        const matches = (!search || text.includes(search)) &&
          (!type || card.dataset.type === type) &&
          (min === null || price >= min) &&
          (max === null || price <= max) &&
          (!pendingInput.checked || card.dataset.status === "pending") &&
          (!priceDropInput.checked || card.dataset.priceDrop === "true") &&
          (!openHouseInput.checked || card.dataset.openHouse === "true");
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      resultCount.textContent = `Showing ${visible} of ${propertyCards.length} sample listings`;
      noResults.hidden = visible !== 0;
    };

    filterForm.addEventListener("input", updateProperties);
    filterForm.addEventListener("change", updateProperties);
    filterForm.addEventListener("reset", () => window.setTimeout(updateProperties, 0));
    updateProperties();
  }

  const mapToggle = document.querySelector("#toggle-property-map");
  const propertyMap = document.querySelector("#property-map");
  if (mapToggle && propertyMap) {
    mapToggle.addEventListener("click", () => {
      const expanded = mapToggle.getAttribute("aria-expanded") === "true";
      mapToggle.setAttribute("aria-expanded", String(!expanded));
      propertyMap.hidden = expanded;
      mapToggle.innerHTML = expanded
        ? '<i class="bi bi-map"></i> Show neighborhood map'
        : '<i class="bi bi-list-ul"></i> Hide neighborhood map';
    });
  }

  const agentCards = Array.from(document.querySelectorAll("[data-agent-card]"));
  if (agentCards.length) {
    const search = document.querySelector("#agent-search");
    const area = document.querySelector("#agent-area-filter");
    const language = document.querySelector("#agent-language-filter");
    const specialty = document.querySelector("#agent-specialty-filter");
    const count = document.querySelector("#agent-result-count");
    const noResults = document.querySelector("#no-agent-results");

    const updateAgents = () => {
      const query = (search.value || "").trim().toLocaleLowerCase();
      let visible = 0;
      agentCards.forEach((card) => {
        const searchable = `${card.dataset.name} ${card.dataset.areas} ${card.textContent}`.toLocaleLowerCase();
        const matches = (!query || searchable.includes(query)) &&
          (!area.value || card.dataset.areas.split(" ").includes(area.value)) &&
          (!language.value || card.dataset.languages.split(" ").includes(language.value)) &&
          (!specialty.value || card.dataset.specialties.split(" ").includes(specialty.value));
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `Showing ${visible} of ${agentCards.length} sample consultants`;
      noResults.hidden = visible !== 0;
    };

    [search, area, language, specialty].forEach((control) => {
      control.addEventListener("input", updateAgents);
      control.addEventListener("change", updateAgents);
    });
    updateAgents();
  }

  const profileContainer = document.querySelector("[data-agent-profile]");
  if (profileContainer) {
    const profileId = new URLSearchParams(window.location.search).get("agent");
    const agent = profileId ? agents[profileId] : null;
    if (!agent) {
      profileContainer.hidden = true;
      document.querySelector("[data-profile-not-found]").hidden = false;
    } else {
      document.title = `${agent.name} - Telecom Estate Agency`;
      document.querySelectorAll("[data-profile-name]").forEach((element) => {
        element.textContent = agent.name;
      });
      document.querySelector("[data-profile-role]").textContent = agent.role;
      document.querySelector("[data-profile-crumb]").textContent = agent.name;
      document.querySelector("[data-profile-first-name]").textContent = agent.name.split(" ")[0];
      document.querySelector("[data-profile-image]").src = agent.image;
      document.querySelector("[data-profile-image]").alt = `${agent.name}, ${agent.role}`;
      document.querySelector("[data-profile-areas]").textContent = agent.areas.join(", ");
      document.querySelector("[data-profile-languages]").textContent = agent.languages.join(", ");
      document.querySelector("[data-profile-specialties]").textContent = agent.specialties.join(", ");
      document.querySelector("[data-profile-bio]").textContent = agent.bio;

      const listings = document.querySelector("[data-profile-listings]");
      agent.listings.forEach((listing) => {
        const column = document.createElement("div");
        column.className = "col-md-6";
        const card = document.createElement("article");
        card.className = "card h-100";
        const image = document.createElement("img");
        image.className = "card-img-top img-fluid";
        image.src = listing.image;
        image.alt = listing.name;
        const body = document.createElement("div");
        body.className = "card-body";
        const heading = document.createElement("h3");
        heading.className = "h5";
        heading.textContent = listing.name;
        const status = document.createElement("span");
        status.className = "listing-badge";
        status.textContent = listing.type;
        const price = document.createElement("p");
        price.className = "mb-0";
        price.textContent = listing.price;
        body.append(status, heading, price);
        card.append(image, body);
        column.append(card);
        listings.append(column);
      });

      const sales = document.querySelector("[data-profile-sales]");
      agent.sales.forEach((sale) => {
        const item = document.createElement("li");
        item.textContent = sale;
        sales.append(item);
      });

      const leadForm = document.querySelector("#agent-lead-form");
      leadForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = new FormData(leadForm);
        const subject = `Property inquiry for ${agent.name}`;
        const body = [
          `For the attention of: ${agent.name} (${profileId})`,
          `Name: ${values.get("name")}`,
          `Email: ${values.get("email")}`,
          "",
          values.get("message")
        ].join("\n");
        window.location.href = `mailto:hello@telecomestate.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  }

  document.querySelectorAll("[data-mailto-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const details = Array.from(values.entries())
        .map(([label, value]) => `${label}: ${String(value).trim()}`)
        .join("\n");
      const subject = form.dataset.subject || "Website inquiry";
      window.location.href = `mailto:hello@telecomestate.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
    });
  });
})();

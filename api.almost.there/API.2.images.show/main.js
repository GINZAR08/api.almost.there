window.addEventListener("load", async function (e) {
  const target = document.querySelector("#result");
  const input = document.querySelector("#search");
  const form = document.querySelector("#search-form");
  async function fetchResults(query = "china") {
    const URL = `https://api.vam.ac.uk/v2/objects/search?q=${encodeURIComponent(
      query
    )}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        console.log("Fetch failed", response.status, response.statusText);
        target.textContent = "Error fetching results";
        return;
      }
      const data = await response.json();
      const records = data.records || [];
      if (records.length === 0) {
        target.textContent = "No results";
      } else {


        const parent = document.createElement("div");

        const resultHTML = records.map((record) => {
          const container = document.createElement("div");
          container.className = "result-item";

          const h2 = document.createElement("h2");
          h2.textContent = record.title || "Untitled";
          parent.appendChild(h2);

          const imageUrl = document.createElement("img");
          imageUrl.src = record.images && record.images.length > 0 ? record.images[0].url : null;
          imageUrl.alt = record.title || "Untitled";
          parent.appendChild(imageUrl);

          const maker = document.createElement("p");
          maker.textContent = `Maker: ${record.maker || "no id"}`;
          parent.appendChild(maker);

          const date = document.createElement("p");
          date.textContent = `Date: ${record.date || "no date"}`;
          parent.appendChild(date);

          const description = document.createElement("p");
          description.textContent = `Description: ${
            record.description || "No description available."
          }`;
          parent.appendChild(description);
          console.log(record);
        });

      }
    } catch (error) {
      console.log(error);
    }
  }

  if (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const q = input && input.value.trim() ? input.value.trim() : "china";
      fetchResults(q);
    });
  } else if (input) {
    input.addEventListener("keydown", function (evt) {
      if (evt.key === "Enter") {
        evt.preventDefault();
        const q = input.value.trim() || "china";
        fetchResults(q);
      }
    });
  }
});

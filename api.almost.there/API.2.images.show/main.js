window.addEventListener("load", async function (e) {
  const target = document.querySelector("#result");
  const input = document.querySelector("#search");
  const form = document.querySelector("#search-form");


 
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const q =  input.value.trim();



      //check if there something in the querry


    fetchResults(q);

    });
  


  async function fetchResults(query ) {
    clearResults();
    const URL = `https://api.vam.ac.uk/v2/objects/search?q=${encodeURIComponent(query)}&data_profile=full`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        console.log("Fetch failed", response.status, response.statusText);
        target.textContent = "Error fetching results";
        return;
      }
      const data = await response.json();
      const records = data.records || [];
      // shows the records of what you are searching for in the console. Use it to understand the record better.
      console.log(records);
      if (records.length === 0) {
        target.textContent = "No results";
      } else {
       
    


     //maker,title, date, iamge, description should be added 

      records.forEach(record => {

        const container = document.createElement("div");

        const image = document.createElement("img");
        //https://framemark.vam.ac.uk/collections/{imageidentifier}/full/full/0/default.jpg
        //create guard if image does not exist
        image.src = record._ || "No image";
        console.log(image.src);
        container.appendChild(image);

        const title = document.createElement("h2");
        title.textContent = record._primaryTitle || "No title";
        container.appendChild(title);

        const maker = document.createElement("p");
        //maker.textContent = record.maker || "No maker";
        container.appendChild(maker);

        const date = document.createElement("p");
        date.textContent = record._primaryDate || "No date";
        container.appendChild(date);

        

        const description = document.createElement("p");
        description.textContent = record.briefDescription || "No description";
        container.appendChild(description);

        target.appendChild(container);

      });




      }
    } catch (error) {
      console.log(error);
    }
    
  }
    function clearResults() {
if (typeof target.replaceChildren === "function") {
        target.replaceChildren();
        return;
      }
}

});

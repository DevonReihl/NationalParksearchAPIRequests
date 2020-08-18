import $ from 'jquery';
const apiKey = "api_key=pifKwyONHCAUk3tc1aUf9s4GJ4szL5hjkaihBNSm";

// The search must trigger a call to NPS's API.
function main() {
  $('form').submit(function (){
    event.preventDefault();
    let search = $('#state').val();
    let limit = $('#limit').val(); 
    let url = `https://developer.nps.gov/api/v1/parks?${apiKey}&limit=${limit}&stateCode=${search},`;
    fetch(url).then(function (response){
      return response.json();
    }).then(function(jsonData){    
      render(jsonData);
    });
  });
} 

// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
function render(jsonData){
  let htmlTemplate = [];
  console.log(jsonData);
  for(let i=0; i < jsonData.data.length; i++){ 
    let fullName = jsonData.data[i].fullName;
    let description = jsonData.data[i].description;
    let parkUrl = jsonData.data[i].url;
    htmlTemplate.push(`
    <h2>${fullName}</h2><br>
    <p>${description}</p>
    <a href='${parkUrl}'>${parkUrl}</a>
    `
    );

  } $('.parks').html(htmlTemplate);
}

$(main);

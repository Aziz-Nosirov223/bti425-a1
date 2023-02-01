

let page = 1
const perPage = 10

const loadMovieData = (title = null) => {

    const ul = document.querySelector('.pagination')

    let url = `https://cloudy-pinafore-fox.cyclic.app/api/movies?page=${page}&perPage=${perPage}`
 
    console.log(url)
    if (title) {
        page = 1
        ul.classList.add("d-none")
        url = `https://cloudy-pinafore-fox.cyclic.app/api/movies?page=${page}&perPage=${perPage}&title=${title}`
    }

    fetch(url)
    .then(res => res.json())
    .then((data) => {
        let tableList = `
        
            ${data.map(movie => (
            `
                <tr data-id=${movie._id}>
                    <td>${movie.year}</td>
                    <td>${movie.title}</td>
                    <td>${movie.plot}</td>
                    <td>${movie.rated}</td>
                    <td>${movie.runtime}</td>
                </tr>
            `
            )).join('')}
            `;
        
        document.querySelector("#moviesTable tbody").innerHTML = tableList
    })
}


document.addEventListener('DOMContentLoaded', function () {
    // populatePostsTable();
 //   populatePostsTable(); // test with User ID 4 (to be removed after testing)
    loadMovieData()
/*    document.querySelector("#searchForm").addEventListener('submit', event => {
        // prevent the form from from 'officially' submitting
        event.preventDefault();

        console.log(document.querySelector("#pageId"))
        // populate the posts table with the userId value
        populatePostsTable(document.querySelector("#pageId").value);
    });*/
});



/*
const createTrElements = () => {

    let tableList = `
    ${}
    <tr data-id="573a139bf29313caabcf3d23">
    <td>1999</td>
    <td>The Matrix</td>
    <td>A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.</td>
    <td>R</td>
    <td>2:16</td>
    </tr>
    

    `
*/
    /*
    let commentsList = `
  <ul class="list-group">
    ${data.map(comment => (`
      <li class="list-group-item">
        ${comment.body}<br /><br />
        <strong>Name:</strong> ${comment.name}<br />
        <strong>Email:</strong> ${comment.email}<br />
      </li>
    `)).join('')}
  </ul>
`;
  
}*/
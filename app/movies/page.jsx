// app/movies/page.js

async function getMovies() {
  const query = `
    query getMovies {
      movies {
        nodes {
          movieFields {
            movieQuote
          }
          title
          uri
        }
      }
    }
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include any authentication tokens or other headers here
      },
      cache: "no-store", // Ensures SSR by not caching the response
    }
  );

  const { data } = await res.json();

  return data.movies.nodes;
}

export default async function MovieList() {
  const movies = await getMovies();

  return (
    <div>
      {movies.map((movie) => {
        const { movieFields: { movieQuote } = {} } = movie;
        return (
          <div key={movie.uri} className="card">
            <h3>{movie.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: movieQuote,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

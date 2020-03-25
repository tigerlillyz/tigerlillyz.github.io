import React from "react";
import Card from "react-bootstrap/Card";

const SearchResults = props => {
  const style = {
    width: 150
  };
  return (
    <div className="searchResults">
      {props.results &&
        props.results.map(article => (
          <Card>
            <Card.Body>
              <Card.Img
                variant="top"
                style={style}
                src={
                  article.urlToImage
                }
              />
              <Card.Title>
                {article.title}
              </Card.Title>
              <Card.Subtitle>
                {article.description}
              </Card.Subtitle>
              <Card.Text></Card.Text>
              <Card.Link
                href={article.url}
              >
                Link to Article
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

// put <Card> stuff into map

export default SearchResults;
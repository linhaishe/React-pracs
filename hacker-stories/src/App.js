import React from "react";
// import logo from './logo.svg';
// import './App.css';

function getTitle(title) {
  return title;
}

//function App()
const App = () => {
  // const handleSearch = (event) => {
  //   console.log(event.target.value);
  // };

  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Hello {getTitle("React")}</h1>
      <h1> hc stories </h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <List list={searchedStories} />
    </div>
    //null
  );
};

//function List()
const List = (props) =>
  props.list.map((item) => (
    <div key={item.objectID}>
      {" "}
      <span>
        {" "}
        <a href={item.url}>{item.title}</a>{" "}
      </span>{" "}
      <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
      <span>{item.points}</span>{" "}
    </div>
  ));

const Search = (props) => (
  <div>
    {" "}
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      onChange={props.onSearch}
      value={props.searchTerm}
    />
    <p>
      {" "}
      {/* searchTerm 使用 */}
      Searching for <strong>{props.searchTerm}</strong>.{" "}
    </p>{" "}
    <hr />
  </div>
);
//传入相同的event 参数,使得控制板输出内容，外部函数获得argument 并运行
// props.onSearch(event);

export default App;

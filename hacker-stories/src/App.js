import React from "react";
// import logo from './logo.svg';
// import './App.css';

const initialStories = [
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

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function getTitle(title) {
  return title;
}

//function App()
const App = () => {
  // const handleSearch = (event) => {
  //   console.log(event.target.value);
  // };

  // const [searchTerm, setSearchTerm] = React.useState("React");

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [stories, setStories] = React.useState(initialStories);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  return (
    <div className="App">
      <h1>Hello {getTitle("React")}</h1>
      <h1> hc stories </h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
    //null
  );
};

//function List()
const List = ({ list, onRemoveItem }) =>
  list.map((item) => (
    <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));
const Item = ({ item, onRemoveItem }) => {
  function handleRemoveItem() {
    onRemoveItem(item);
  }
  return (
    <div>
      {" "}
      <span>
        {" "}
        <a href={item.url}>{item.title}</a>{" "}
      </span>{" "}
      <span>{item.author}</span> <span>{item.num_comments}</span>{" "}
      <span>{item.points}</span>{" "}
      <span>
        {" "}
        <button type="button" onClick={() => onRemoveItem(item)}>
          {" "}
          Dismiss{" "}
        </button>{" "}
      </span>{" "}
    </div>
  );
};
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

// const Search = ({ search, onSearch }) => (
//   <div>
//     <label htmlFor="search">Search: </label>
//     <input id="search" type="text" value={search} onChange={onSearch} />
//   </div>
// );

// const List = ({ list }) =>
//   list.map((item) => <Item key={item.objectID} item={item} />);

// const Item = ({ item }) => (
//   <div>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//   </div>
// );

export default App;

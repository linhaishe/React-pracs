import React from "react";

export default class News extends React.Component {
  state = {
    newsArr: ["news001", "news002", "news003"],
  };

  render() {
    return (
      <div>
        {/* 可以将数据写死，也可以根据数据进行渲染，因为数据是数组 */}
        <ul>
          {this.state.newsArr.map((news, index) => (
            <li key={index}>{news}</li>
          ))}
        </ul>
      </div>
    );
  }
}

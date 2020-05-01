//import React from "react";

// class AboutPage extends React.Component {
//   render() {
//     return (
//       <>
//         <h2>About</h2>
//         <p>this app uses react</p>
//       </>
//     );
//   }
// }

// export default AboutPage;

import React, { Component } from "react";

export default class AboutPage extends Component {
  render() {
    return (
      //   <div>
      //     <h2>About</h2>
      //     <p>this app uses react</p>
      //   </div>

      //   <React.Fragment>
      //     <h2>About</h2>
      //     <p>this app uses react</p>
      //   </React.Fragment>

      <>
        <h2>About</h2>
        <p>this app uses react</p>
      </>
    );
  }
}

//an jsx elements must be wrapped in an enclosing tag.jsx is compiled down to function calls.you can only have one top-level function.we can only have one top-level element in jsx

//we can use React.Fragment.

//我们可以使用空标签声明片段，这是指定片段的一种简便方法。which is a short hand way to specify a fragment

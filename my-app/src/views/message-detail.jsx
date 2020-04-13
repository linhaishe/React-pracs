import React from "react";

const messageDetails = [
  { id: 1, title: "Message001", content: "我爱你, 中国" },
  { id: 3, title: "Message003", content: "我爱你, 老婆" },
  { id: 6, title: "Message006", content: "我爱你, 孩子" }
];

export default function MessageDetail(props) {
  //得到请求参数的id
  // const { id } = props.match.params
  //根据文档读取数据
  const id = props.match.params.id;
  //debugger
  //字符串1和数字1类型不同，所欲id*1将字符串变为数字类型
  //得到对应的msg,find()方法
  const md = messageDetails.find(md => md.id === id * 1);
  //返回第一个结果为true的数组元素
  // const message = messageDetails.find(m => m.id === id);

  return (
    <ul>
      <li>ID: {md.id}</li>
      <li>TITLE: {md.title}</li>
      <li>CONTENT: {md.content}</li>
    </ul>
  );
}

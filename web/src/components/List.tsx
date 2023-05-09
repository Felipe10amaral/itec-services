import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MyData {
    _id: string;
    title: string;
    description: string;
  }

interface Props {
  data: MyData[];
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
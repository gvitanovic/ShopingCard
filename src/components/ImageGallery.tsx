import React from "react";
import Carousel from "react-material-ui-carousel";
import { AppProvider } from "../state/AppProvider";

const items = require('../config/cardData.json')?.values;

interface IItem {
  id: number;
  name: string;
  description: string;
  src: string;
}

const itemStyle = {
  width: "300px",
  height: "300px",
}

function Item({ item }: { item: { description: string, src: string, id: number } }) {
  return (
    <div style={itemStyle}>
      <img
        src={item.src}
        key={item.id}
        alt={item.description}
        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}


export const ImageGallery = () => {

  const [index, setIndex] = React.useState(0);

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur);
    console.log(cur, prev);
  };

  return (
    <AppProvider.Consumer>{props => (
      <div>
        <Carousel
          index={
            props?.value === -1 ?
              index :
              props?.value
          }
          onChange={handleChange}
          // interval={4000}
          autoPlay={false}
          animation="fade"
          indicators={false}
          // stopAutoPlayOnHover
          swipe
          className="my-carousel"
        >
          {items.map((item: IItem) => (
            <Item key={item.id} item={item} />
          ))}
        </Carousel>
        {items.map((item: IItem, i: number) => (
          <button
            onClick={() => {props?.setValue(-1);setIndex(i)}}
            style={{ background: i === index ? "#ccc" : "#fff", height: '56px', width: '56px' }}
            key={item.id}
          >
            {item.name}
            {/* <Item key={item.id} item={item} /> */}
          </button>
        ))}
      </div>
    )}
    </AppProvider.Consumer>
  );
};
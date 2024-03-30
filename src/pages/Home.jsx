import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/templetes/ProductCard";
import { useSelector } from "react-redux";

const Home = () => {
  const data = useSelector((state) => state.products.productsData);

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const categoryHandler = (category) => {
    if (category == "all") {
      setProducts(data);
    }
    const filterData = data.filter((data) => data.category == category);
    setProducts(filterData);
  };

  useEffect(() => {
    //   let _category = new Set(data.map((data) => data.category)); // it will return an object
    let _category = data
      .map((data) => data.category)
      .reduce((acc, curr) => {
        if (!acc.includes(curr)) {
          acc = [...acc, curr];
        }
        return acc;
      }, []);
    setProducts(data);
    setCategory(_category);
  }, [data]);

  return (
    <main>
      <Layout className={`grid grid-cols-6 grid-rows-1 items-start`}>
        <div className="col-span-1 pr-3 sticky top-[15vh]">
          <h2 className="text-2xl font-bold capitalize">category</h2>
          <hr className="my-3" />
          <ul className="flex flex-col gap-2">
            {category &&
              category.map((item, idx) => (
                <li
                  onClick={() => {
                    categoryHandler(item);
                  }}
                  className="px-3 py-3 rounded capitalize text-lg font-medium w-full bg-zinc-100 cursor-pointer"
                  key={idx}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-span-5 border-l overflow-y-auto">
          <div className="relative flex flex-wrap justify-evenly gap-3 p-3 ">
            {products.map((product, index) => (
              <a href={`/`} key={product.id}>
                <ProductCard data={product} />
              </a>
            ))}
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Home;

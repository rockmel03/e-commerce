import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/templetes/ProductCard";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const { productsData } = useSelector((state) => state.products);

  const _category = productsData ? productsData.map((p) => p.category) : "";
  const categories = [...new Set(_category)];

  return (
    <aside className="w-full">
      <h2 className="text-2xl font-bold capitalize">category</h2>
      <hr className="my-3" />
      <ul className="flex flex-col gap-2">
        {categories &&
          categories.map((item, idx) => (
            <Link
              to={`/?category=${item}`}
              className="px-3 py-3 rounded capitalize text-lg font-medium w-full bg-zinc-100 cursor-pointer hover:bg-zinc-200"
              key={idx}
            >
              {item}
            </Link>
          ))}
      </ul>
    </aside>
  );
};

const Home = () => {
  const { productsData } = useSelector((state) => state.products);
  const [products, setProducts] = useState(null);

  const { search } = useLocation();
  const queryCategory = decodeURIComponent(search.split("=")[1]);

  useEffect(() => {
    if (!products || queryCategory == "undefined") {
      setProducts(productsData);
    }
    if (queryCategory != "undefined") {
      setProducts(productsData.filter((p) => p.category == queryCategory));
    }
  }, [queryCategory, productsData]);

  return products?.length > 0 ? (
    <main>
      <Layout className="flex items-start justify-between">
        <div className="w-[20%]  px-3 sticky top-[12vh]">
          <SideNav />
        </div>
        <div className="w-[80%] flex flex-wrap gap-5 pl-3 border-l-[3px] overflow-auto">
          {products &&
            products.map((item, idx) => {
              return (
                <Link to={`/details/${item.$id}`} key={item.$id}>
                  <ProductCard data={item} />
                </Link>
              );
            })}
        </div>
      </Layout>
    </main>
  ) : (
    <h1 className="text-xl text-center">Loading...</h1>
  );
};

export default Home;

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "./Products";

function Home() {
  return (
    <>
      <Hero />
      <Categories />   {/* ✅ NEW */}
      <Products featured/>
    </>
  );
}

export default Home;

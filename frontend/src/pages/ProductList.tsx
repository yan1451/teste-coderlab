import { useEffect, useState } from "react";
import { productService } from "@/services";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import { IProduct } from "@/services/products/product.interface";
import { PaginationComponent } from "@/components/Pagination";
import { SelectComponent } from "@/components/Select";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts(
          filter,
          page,
          pageSize
        );
        setProducts(response);
        setTotalPage(Math.ceil(response.length / pageSize));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [filter, page, pageSize]);

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((product: IProduct) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    window.location.href = "/product/0";
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen">
    <div className="flex flex-col mx-auto p-4 border border-black justify-items-center">
      <ProductFilter
        filter={filter}
        setFilter={setFilter}
        onAdd={handleAddProduct}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-[1200px] mx-auto">
        {products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            photo={product.photo}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between border border-gray-200">
        <SelectComponent
          className="mt-6"
          options={["10", "20", "30", "40", "50"]}
          selectedValue={pageSize}
          setSelectedValue={setPageSize}
          placeholder={pageSize > 0 ? `${pageSize}`: `itens por pagina`}
          disabled={false}
        />
          <PaginationComponent
            page={page}
            totalPage={totalPage}
            setPage={setPage}
          />
      </div>
    </div>
    </div>
  );
};

export default ProductList;

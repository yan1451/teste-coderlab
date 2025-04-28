import { useForm, FormProvider } from 'react-hook-form'; 
import { useEffect, useState } from 'react';
import { Button, Form } from '@/components/ui/button';
import {useParams, useNavigate } from 'react-router-dom';
import { categoryService, productService } from '@/services'; 
import { IProduct } from '@/services/products/product.interface'; 
import ProductFormFields from '../components/Form';

const ProductForm = () => {
  const { id: productId } = useParams(); 
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState<IProduct | null>(null);
  const methods = useForm({
    defaultValues: {
      categories: [],
      name: '',
      qty: 0,
      price: 0,
      photo: '',
    },
  });
  const { handleSubmit, reset } = methods;
  console.log(categories)
  useEffect(() => {
    if (productId !== '0' && productId) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await productService.getProductById(productId);
          setProduct(fetchedProduct);
          reset(fetchedProduct);
        } catch (error) {
          console.error('Erro ao buscar produto', error);
        }
      };
      fetchProduct();
    }
  }, [productId, reset]);
  console.log(methods.watch('categories'))
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryService.getAll();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias', error);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (productId === '0') {

        await productService.createProduct(data);
        alert('Produto criado com sucesso');
      } else {
        
        await productService.updateProduct(productId, data);
        alert('Produto atualizado com sucesso');
      }
      navigate('/product');
    } catch (error) {
      console.error('Erro ao salvar produto', error);
    }
  };

  return (
    <div className="flex items-center bg-gray-200 w-screen min-h-screen">
    <div className="div flex flex-col mx-auto p-4 border border-black justify-items-center rounded-md bg-white shadow-md">
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ProductFormFields categories={categories}/>
        <Button type="submit" className="btn btn-primary">
          {productId === '0' ? 'Criar Produto' : 'Atualizar Produto'}
        </Button>
      </form>
    </FormProvider>
    </div>
    </div>
  );
};

export default ProductForm;

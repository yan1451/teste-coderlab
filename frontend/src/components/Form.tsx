import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
} from "@/components/ui";
import { ICategory } from "@/services/category/category.interface";
import { useFormContext } from "react-hook-form";
import { SelectComponent } from "./Select";

const ProductFormFields = ({ categories }: { categories: ICategory[] }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Produto</FormLabel>
            <FormControl>
              <Input
                placeholder="Nome do Produto"
                {...field}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage>{errors.name && errors.name.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="qty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Quantidade"
                {...field}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage>{errors.qty && errors.qty.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Preço"
                {...field}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage>{errors.price && errors.price.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="photo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foto</FormLabel>
            <FormControl>
              <Input
                placeholder="URL da Foto"
                {...field}
                className="focus:ring-2 focus:ring-blue-500"
              />
            </FormControl>
            <FormMessage>{errors.photo && errors.photo.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categories"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categorias</FormLabel>
            <FormControl>
              <SelectComponent
                options={categories}
                placeholder="Selecione uma categoria"
                className="w-full"
                labelKey="name"
                valueKey="id"
                onValueChangeCustom={(value) => {
                  const selectedOption = {
                    id: value,
                    name: categories.find((cat) => cat.id === value)?.name,
                  };

                  const updatedCategories = field.value.some(
                    (cat: ICategory) => cat.id === selectedOption.id
                  )
                    ? field.value.filter(
                        (cat: ICategory) => cat.id !== selectedOption.id
                      )
                    : [...field.value, selectedOption];

                  field.onChange(updatedCategories);
                }}
              />
            </FormControl>

            {/* Exibe as categorias selecionadas */}
            <div className="mt-4">
              <h4>Categorias Selecionadas:</h4>
              <ul className="bg-gray-100 ">
                {field.value.map((category: ICategory) => (
                  <li
                    key={category.id}
                    className="flex items-center gap-2 justify-between p-2 border border-black rounded-md mb-2"
                  >
                    {category.name}
                    <Button
                      type="button"
                      aria-label="Remover categoria"
                      className="text-red-500 hover:underline text-xs h-6 w-2"
                      onClick={() => {
                        const updatedCategories = field.value.filter(
                          (c: ICategory) => c.id !== category.id
                        );
                        field.onChange(updatedCategories);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <FormMessage>
              {errors.categories && errors.categories.message}
            </FormMessage>
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductFormFields;

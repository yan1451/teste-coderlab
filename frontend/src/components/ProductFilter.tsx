import { Input, Button } from '@/components/ui';


interface ProductFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  onAdd: () => void;
}

const ProductFilter = ({ filter, setFilter, onAdd }: ProductFilterProps) => (
  <div className="mb-4 flex justify-between items-center">
    <Input 
      placeholder="Pesquisar Produto"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-1/3"
    />
    <Button onClick={onAdd}>Adicionar Produto</Button>
  </div>
);

export default ProductFilter;

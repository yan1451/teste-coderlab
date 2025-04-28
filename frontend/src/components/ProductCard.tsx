import { Card, Button } from "@/components/ui";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  photo: string;
  onDelete: () => void;
}

const ProductCard = ({
  id,
  name,
  price,
  photo,
  onDelete,
}: ProductCardProps) => (
  <Card key={id} className="p-4 shadow-lg flex flex-col justify-between h-full">
    <div className="flex flex-col pb-4 h-auto">
      <h2 className="font-bold line-clamp-2">{name}</h2>
      <h2 className="self-start mt-2">R$ {price}</h2>
    </div>
    <div className="flex justify-center mt-4 border-b border-gray-500 pb-4">
      <img src={photo} alt={name} className="object-fit rounded-md" />
    </div>
    <div className="mt-4 flex justify-between">
      <Link to={`/product/${id}`}>
        <Button variant="outline">Editar</Button>
      </Link>
      <Button variant="destructive" onClick={onDelete}>
        Remover
      </Button>
    </div>
  </Card>
);

export default ProductCard;

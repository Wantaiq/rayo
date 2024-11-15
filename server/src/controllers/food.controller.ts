import foodService from '@/services/food.service';
import tryCatch from '@/utils/tryCatch';

const getAll = tryCatch(async (req, res) => {
  const food = await foodService.getAll();

  res.status(200).json(food).end();
});

export default { getAll };

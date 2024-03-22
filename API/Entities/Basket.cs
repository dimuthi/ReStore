using System.Collections.Generic;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public String BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity) {
            if(Items.All(item => item.ProdductId != product.Id)){
                Items.Add(new BasketItem{Product = product, Quantity = quantity});
            }
        }
    }
}
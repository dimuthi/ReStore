using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context) {
            _context = context;           
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket() {
            var basket = await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
                
            if(basket == null){
                return NotFound();
            }
            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int quantity, int productId){
            return StatusCode(201);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int quantity, int productId){
            return Ok();
        }
    }
}
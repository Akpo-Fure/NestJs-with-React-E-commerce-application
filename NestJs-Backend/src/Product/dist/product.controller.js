"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var Guards_1 = require("src/Auth/Guards");
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.createProduct = function (req, dto) {
        var userId = req.user.id;
        return this.productService.createProduct(userId, dto);
    };
    ProductController.prototype.updateProduct = function (productId, dto) {
        return this.productService.updateProduct(productId, dto);
    };
    ProductController.prototype.getProducts = function () {
        return this.productService.getProducts();
    };
    ProductController.prototype.getProductById = function (productId) {
        return this.productService.getProductById(productId);
    };
    __decorate([
        common_1.UseGuards(Guards_1.JwtGuard, Guards_1.AdminGuard),
        common_1.Post(),
        __param(0, common_1.Request()), __param(1, common_1.Body())
    ], ProductController.prototype, "createProduct");
    __decorate([
        common_1.UseGuards(Guards_1.JwtGuard, Guards_1.AdminGuard),
        common_1.Patch(':id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], ProductController.prototype, "updateProduct");
    __decorate([
        common_1.Get()
    ], ProductController.prototype, "getProducts");
    __decorate([
        common_1.Get(':id'),
        __param(0, common_1.Param('id'))
    ], ProductController.prototype, "getProductById");
    ProductController = __decorate([
        common_1.Controller('product')
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;

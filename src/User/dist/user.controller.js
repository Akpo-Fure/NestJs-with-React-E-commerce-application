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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var Guards_1 = require("src/Auth/Guards");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.getUser = function (req) {
        return this.userService.getUser(req);
    };
    UserController.prototype.updateUserUprofile = function (req, dto) {
        var id = req.user.id;
        return this.userService.updateUserProfile(id, dto);
    };
    UserController.prototype.getAllUsers = function () {
        return this.userService.getAllUsers();
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Request())
    ], UserController.prototype, "getUser");
    __decorate([
        common_1.Patch(),
        __param(0, common_1.Request()), __param(1, common_1.Body())
    ], UserController.prototype, "updateUserUprofile");
    __decorate([
        common_1.UseGuards(Guards_1.AdminGuard),
        common_1.Get('/users')
    ], UserController.prototype, "getAllUsers");
    UserController = __decorate([
        common_1.UseGuards(Guards_1.JwtGuard),
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using Models.DTOS;
using Moq;
using OnlineShoppingApp.Controllers;
using Services.ServiceContract;

namespace Tests.Controllers
{
    public class AuthControllerTest
    {
        private readonly Mock<IAuthService> _authService;
        private readonly AuthController _authController;

        public AuthControllerTest()
        {
            _authService = new Mock<IAuthService>();
            _authController = new AuthController(_authService.Object);
        }

        [Fact]
        //MethodName_ExpectedResult_Condition
        public async Task Register_ReturnsOk_WhenRegistrationIsSuccessful()
        {
            //Arrange
            var registerDto = new RegisterDto
            {
                Name = "Sahas",
                UserName = "Sahas123",
                Email = "sahas@gmail.com",
                Password = "Sk123@#",
                ConfirmPassword = "Sk123@#"
            };

            var identityResult = IdentityResult.Success;
            ;

            _authService
                .Setup(x => x.RegisterAsync(registerDto))
                .ReturnsAsync(identityResult);
            //_authController.ModelState.AddModelError("ConfirmPassword", "Confirm Password is Required");

            //Act
            var result = await _authController.Register(registerDto);

            //Assert

            var okResult=Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200,okResult.StatusCode);
            _authService
                .Verify(x=>x.RegisterAsync(registerDto)
                , Times.Once());
        }

        [Fact]
        public async Task Register_ReturnBadRequest_WhenRegistrationFails() 
        {

            //Arrange
            var registerDto = new RegisterDto
            {
                Name = "Sahas",
                UserName = "Sahas123",
                Email = "sahas@gmail.com",
                Password = "Sk123@#",
                ConfirmPassword = "Sk123@#"
            };

            var error = new IdentityError
            {
                Code = "DuplicateEmail",
                Description = "Email Cannot Be Same"
            };


            var identityResult = IdentityResult.Failed(error);
            _authService
                .Setup(x => x.RegisterAsync(It.IsAny<RegisterDto>()))
                .ReturnsAsync(identityResult);

            //Act
            var result = await _authController.Register(registerDto);

            //Assert
            var badRequest=Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(400, badRequest.StatusCode);

            _authService.Verify(x => x.RegisterAsync(It.IsAny<RegisterDto>()),Times.Once);
        }

    }
}

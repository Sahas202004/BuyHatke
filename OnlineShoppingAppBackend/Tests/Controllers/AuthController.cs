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


        [Fact]

        public async Task Register_ReturnsBadRequest_WhenModelStateIsInvalid()
        {

            //Arrange
            var registerDto = new RegisterDto
            {
                Name = "Sahas",
                UserName = "Sahas123",
                Email = "sahas@gmail.com",
                Password = "Sk123@#",
                //ConfirmPassword = "Sk123@#"
            };

            _authController.ModelState.AddModelError(
                    "ModelState", "ModelStateIsInvalid"
                );

            //Act
            var result = await _authController.Register(registerDto);

            //Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(400, badRequest.StatusCode);

            _authService
                .Verify(
                    x => x.RegisterAsync(It.IsAny<RegisterDto>()), Times.Never()
                );
        }


        [Fact]
        public async Task Login_ReturnsOk_WhenLoginIsSuccessful() 
        {
            //Arrange
            LoginDto loginDto = new LoginDto
            {
                Email = "sahas@gmail.com",
                Password = "Sk123123"
            };

            LoginResponseDto loginResponseDto = new LoginResponseDto
            {
                Token = "jwt-token",
                UserName = "Sahas",
                Email = "sahas@gmail.com",
                UserId = "1"
            };
            IdentityResult identityResult = IdentityResult.Success;

            _authService
                .Setup(x => x.LoginAsync(It.IsAny<LoginDto>()))
                .ReturnsAsync(loginResponseDto);

            //Act
            var result = await _authController.Login(loginDto);

            //Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var loginResponse = Assert.IsType<LoginResponseDto>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(loginResponseDto, loginResponse);

            _authService.Verify(
                x => x.LoginAsync(It.IsAny<LoginDto>()), Times.Once()
                );
        }

        [Fact]
        public async Task Login_ReturnsUnAuthorized_WhenLoginFails()
        {
            //Arrange
            LoginDto loginDto = new LoginDto
            {
                Email = "sahas@gmail.com",
                Password = "Sk123123"
            };

            string expectedMessage = "Invalid Email Or Password";

            _authService
                .Setup(x => x.LoginAsync(It.IsAny<LoginDto>()))
                .ReturnsAsync((LoginResponseDto)null);

            //Act
            var result= await _authController.Login(loginDto);

            //Assert
            var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
            var actualMessage = Assert.IsType<ErrorResponseDto>(unauthorized.Value);
            Assert.Equal(401,unauthorized.StatusCode);
            Assert.Equal(expectedMessage, actualMessage.Message);
            

            _authService.Verify(
                x => x.LoginAsync(It.IsAny<LoginDto>()),
                Times.Once()
                );
        }

        [Fact]
        public async Task Login_ReturnsBadRequest_WhenModelIsInvalid()
        {
            //Arrange
            LoginDto loginDto = new LoginDto
            {
                Email = "sahas@gmail.com",
                Password = "Sk123123"
            };

            _authController.ModelState.AddModelError("InvalidModel", "Model Passed is Invalid");

            //Act 
            var result=await _authController.Login(loginDto);

            //Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(400, badRequest.StatusCode);

            _authService
                .Verify(
                    x=>x.LoginAsync(It.IsAny<LoginDto>()), Times.Never()
                );
        }

    }
}

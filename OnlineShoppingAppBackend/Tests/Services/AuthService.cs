using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Models.DTOS;
using Models.Entities;
using Moq;
using Services.ServiceContract;
using Services.ServiceImplementation;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;


namespace Tests.Services
{
    public class AuthServiceTest
    {
        private readonly Mock<IJwtService> _jwtService;
        private readonly Mock<UserManager<Customer>> _userManager;
        private readonly Mock<SignInManager<Customer>> _signInManager;
        private readonly AuthService _authService;

        
        public AuthServiceTest()
        {
            var store = new Mock<IUserStore<Customer>>();
            _userManager = new Mock<UserManager<Customer>>(
                store.Object,null,null,null,null,null,null,null,null);

            var contextAccessor=new Mock<IHttpContextAccessor>();
            var claimFactory = new Mock<IUserClaimsPrincipalFactory<Customer>>();

            _signInManager = new Mock<SignInManager<Customer>>(
                _userManager.Object,contextAccessor.Object,claimFactory.Object,null,null,null,null
                );

            _jwtService = new Mock<IJwtService>();

            _authService = new AuthService(_userManager.Object, _signInManager.Object, _jwtService.Object);
        }

        [Fact]
        public async Task Login_ReturnsResponseDto_WhenTestIsSuccessful()
        {
            ///Arrange
            LoginDto loginDto = new LoginDto
            {
                Email = "Sahas@gmail.com",
                Password = "password"
            };

            LoginResponseDto responseDto = new LoginResponseDto
            {
                Token = "JwtToken",
                Email = "sahas@gmail.com",
                UserId = "UserId",
                UserName = "UserName"
            }
            ;

            Customer cust = new Customer
            {
                Id = "UserId",
                Email = "sahas@gmail.com",
                UserName = "UserName"
            };

            _jwtService
                .Setup(x => x.GenerateToken(cust))
                .Returns("JwtToken");
            _userManager
                .Setup(x => x.FindByEmailAsync(loginDto.Email))
                .ReturnsAsync(cust);
            _signInManager
                .Setup(x => x.CheckPasswordSignInAsync(
                    It.IsAny<Customer>(), It.IsAny<string>(), false
                    ))
                .ReturnsAsync(SignInResult.Success);

            ///Act
            var result =await _authService.LoginAsync(loginDto);

            ///Assert
            var response = Assert.IsType<LoginResponseDto>(result);
            Assert.Equal(responseDto.Token, response.Token);
            Assert.Equal(responseDto.Email, response.Email);
            Assert.Equal(responseDto.UserId, response.UserId);
            Assert.Equal(responseDto.UserName, response.UserName);
            //Assert.Equal(responseDto, response);


            _userManager
                .Verify(
                    x => x.FindByEmailAsync(It.IsAny<string>()), Times.Once
                );
            _signInManager
                .Verify(
                    x => x.CheckPasswordSignInAsync(It.IsAny<Customer>(), It.IsAny<string>(),false), Times.Once
                );

        }

        [Fact]
        public async Task Login_ReturnsNull_WhileEmailNotFound()
        {
            ///Arrange
            LoginDto loginDto = new LoginDto
            {
                Email = "Sahas@gmail.com",
                Password = "password"
            };

            _userManager
                .Setup(x => x.FindByEmailAsync(loginDto.Email))
                .ReturnsAsync((Customer)null);

            //Act
            var result = await _authService.LoginAsync(loginDto);

            //Assert
            //var response = Assert.IsType<LoginResponseDto>(result);
            Assert.Null(result);

            _userManager
                .Verify(
                    x => x.FindByEmailAsync(It.IsAny<string>()), Times.Once
                );
            _signInManager
                .Verify(
                    x => x.CheckPasswordSignInAsync(It.IsAny<Customer>(), It.IsAny<string>(), false), Times.Never
                );
        }

        [Fact]
        public async Task Login_ReturnsFailed_WhilePasswordIsNotCorrect() 
        {
            LoginDto loginDto = new LoginDto
            {
                Email = "sahas@gmail.com",
                Password = "password"
            };

            Customer cust = new Customer();

            SignInResult signInResult = SignInResult.Failed;
            _userManager
                .Setup(x => x.FindByEmailAsync(loginDto.Email))
                .ReturnsAsync(cust);
            _signInManager
                .Setup(x => x.CheckPasswordSignInAsync(
                    It.IsAny<Customer>(), It.IsAny<string>(), false
                    ))
                .ReturnsAsync(signInResult);

            //Act
            var result= await _authService.LoginAsync(loginDto);

            //Assert
            Assert.Null(result);
            

            _userManager.Verify(
                x => x.FindByEmailAsync(It.IsAny<string>()), Times.Once
                );
            _signInManager.Verify(
                x => x.CheckPasswordSignInAsync(It.IsAny<Customer>(),
                It.IsAny<string>(), false), Times.Once()
                );
        }

        [Fact]
        public async Task Register_ReturnsSuccess_WhileRegisterIsSuccess()
        {
            //Arrange
            RegisterDto registerDto = new RegisterDto
            {
                Name = "Sahas",
                UserName = "Sk123",
                Email = "Sahas@gmail.com",
                PhoneNumber = "1234567890",
                Password = "password",
                ConfirmPassword = "password"
            };

            IdentityResult identityResult = IdentityResult.Success;

            _userManager
                .Setup(x => x.CreateAsync(It.IsAny<Customer>(), registerDto.Password))
                .ReturnsAsync(identityResult);

            //Act
            var result= await _authService.RegisterAsync(registerDto);

            //Assert
            var response=Assert.IsType<IdentityResult>(result);
            Assert.Equal(identityResult, response);

            _userManager
                .Verify(x => x.CreateAsync(It.IsAny<Customer>(), registerDto.Password), Times.Once);
        }
    }
}

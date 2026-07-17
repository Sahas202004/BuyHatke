using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class ErrorResponseDto
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? ErrorCode { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public List<string>? Errors { get; set; }
        public string? Path { get; set; }
    }
}

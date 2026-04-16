using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Trackify.Data.Entities;
using Trackify.Models.CreateUpdateModels;
using Trackify.Models.SearchModels;

namespace Trackify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly TrackifyDbContext _context;

        public StatusController(TrackifyDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreateUpdateStatusMaster")]
        public async Task<IActionResult> CreateUpdateStatusMaster(CUStatusMaster request)
        {
            // 🔹 CREATE
            if (request.Id == null || request.Id == Guid.Empty)
            {
                var entity = new StatusMaster
                {
                    Id = Guid.NewGuid(),
                    StatusCode = request.StatusCode.ToUpper(),
                    Description = request.Description,
                    StatusValue = request.StatusValue,
                    RecordVersion = 0
                };

                _context.StatusMasters.Add(entity);
                await _context.SaveChangesAsync();

                return Ok(entity);
            }

            // 🔹 UPDATE
            var existing = await _context.StatusMasters
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (existing == null)
                return NotFound("Record not found");

            // 🔥 VERSION CHECK
            if (existing.RecordVersion != request.RecordVersion)
                return Conflict("Record has been modified by another user");

            // Update fields
            existing.StatusCode = request.StatusCode.ToUpper();
            existing.Description = request.Description;
            existing.StatusValue = request.StatusValue;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Concurrency conflict occurred");
            }

            return Ok(existing);
        }

        // =========================
        // 🔍 SEARCH API
        // =========================
        [HttpPost("SearchStatusMaster")]
        public async Task<IActionResult> SearchStatusMaster(
            string? statusCode,
            int? statusValue)
        {
            var query = _context.StatusMasters.AsQueryable();

            if (!string.IsNullOrEmpty(statusCode))
            {
                query = query.Where(x => x.StatusCode.Contains(statusCode.ToUpper()));
            }

            if (statusValue.HasValue)
            {
                query = query.Where(x => x.StatusValue == statusValue);
            }

            var result = await query
                .Select(x => new SearchStatusMaster
                {
                    Id = x.Id,
                    StatusCode = x.StatusCode,
                    Description = x.Description,
                    StatusValue = x.StatusValue,
                    RecordVersion = x.RecordVersion
                })
                .ToListAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusMaster(Guid id, int recordVersion)
        {
            var entity = await _context.StatusMasters
                .FirstOrDefaultAsync(x => x.Id == id);

            if (entity == null)
                return NotFound("Record not found");

            // 🔥 VERSION CHECK
            if (entity.RecordVersion != recordVersion)
                return Conflict("Record already updated/deleted");

            _context.StatusMasters.Remove(entity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Concurrency conflict occurred");
            }

            return Ok("Deleted successfully");
        }
    }
}

namespace Trackify.Models.SearchModels
{
    public class SearchStatusMaster
    {
        public Guid Id { get; set; }

        public string StatusCode { get; set; } = null!;

        public string? Description { get; set; }

        public int StatusValue { get; set; }

        public int RecordVersion { get; set; }
    }
}

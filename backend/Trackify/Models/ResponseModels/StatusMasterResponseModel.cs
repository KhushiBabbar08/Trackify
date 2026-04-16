namespace Trackify.Models.ResponseModels
{
    public class StatusMasterResponseModel
    {
        public Guid Id { get; set; }
        public string StatusCode { get; set; }
        public string Description { get; set; }
        public int StatusValue { get; set; }
        public int RecordVersion { get; set; }
    }
}

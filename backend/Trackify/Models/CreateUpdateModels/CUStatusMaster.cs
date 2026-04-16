namespace Trackify.Models.CreateUpdateModels
{
    public class CUStatusMaster
    {
        public Guid? Id { get; set; }  // null = create
        public string StatusCode { get; set; }
        public string Description { get; set; }
        public int StatusValue { get; set; }
        public int? RecordVersion { get; set; }

    }
}

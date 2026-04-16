using System;
using System.Collections.Generic;

namespace Trackify.Data.Entities;

public partial class StatusMaster
{
    public Guid Id { get; set; }

    public string StatusCode { get; set; } = null!;

    public string? Description { get; set; }

    public int StatusValue { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int RecordVersion { get; set; }
}

using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Trackify.Data.Entities;

public partial class TrackifyDbContext : DbContext
{
    public TrackifyDbContext()
    {
    }

    public TrackifyDbContext(DbContextOptions<TrackifyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<StatusMaster> StatusMasters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=trackify_db;Username=postgres;Password=pass@123");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StatusMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("StatusMaster_pkey");

            entity.ToTable("StatusMaster");

            entity.HasIndex(e => e.StatusCode, "StatusMaster_StatusCode_key").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("gen_random_uuid()");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.RecordVersion).HasDefaultValue(0);
            entity.Property(e => e.StatusCode).HasMaxLength(50);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp without time zone");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

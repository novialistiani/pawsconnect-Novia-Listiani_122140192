import os
import sys
import transaction

from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings, setup_logging

# Import dari models
from ..models import Base, DBSession, Kucing  # pastiin udah ada model Kucing

def main(argv=sys.argv):
    if len(argv) != 2:
        print("Usage: initialize_db <config_uri>")
        sys.exit(1)

    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    try:
        # Setup engine dan session
        engine = engine_from_config(settings, 'sqlalchemy.')
        DBSession.configure(bind=engine)

        # Buat tabel-tabel di database
        Base.metadata.create_all(engine)
        print("✅ Tabel database berhasil dibuat.")

        # Optional: Tambah data dummy kucing
        with transaction.manager:
            sample_cat = Kucing(
                nama="Mochi",
                umur=2,
                deskripsi="Kucing jinak dan suka dielus",
                foto_url="https://example.com/mochi.jpg"
            )
            DBSession.add(sample_cat)
            print("🐾 Data kucing sample berhasil ditambahkan.")

        print("🎉 Inisialisasi database aplikasi adopsi kucing selesai!")

    except Exception as e:
        print("❌ Terjadi kesalahan saat inisialisasi database:")
        print(e)
        sys.exit(1)

"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-05-24
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    from app.core.database import Base
    from app.models import *  # noqa: F401,F403
    bind = op.get_bind()
    Base.metadata.create_all(bind=bind)


def downgrade():
    from app.core.database import Base
    bind = op.get_bind()
    Base.metadata.drop_all(bind=bind)

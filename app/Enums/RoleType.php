<?php

namespace App\Enums;

enum RoleType: string
{
    case SUPERADMIN = 'SUPERADMIN';
    case PEGAWAI = 'PEGAWAI';
    case SDM = 'SDM';
}

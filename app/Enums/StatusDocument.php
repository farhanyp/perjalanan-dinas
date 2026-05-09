<?php

namespace App\Enums;

enum StatusDocument: string
{
    case DRAFT = 'DRAFT';
    case PROCESSING = 'PROCESSING';
    case APPROVE = 'APPROVE';
    case DECLINE = 'DECLINE';
    case ARCHIVED = 'ARCHIVED';
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->string('title');
            $table->string('description')->nullable();
            $table->enum('status', ['DRAFT', 'PROCESSING', 'APPROVE', 'DECLINE', 'ARCHIVED'])->default('DRAFT');
            $table->string('start_date');
            $table->string('end_date');
            $table->text('message_decline')->nullable();
            $table->foreignUuid('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->index('status');
            $table->index('start_date');
            $table->index('end_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};

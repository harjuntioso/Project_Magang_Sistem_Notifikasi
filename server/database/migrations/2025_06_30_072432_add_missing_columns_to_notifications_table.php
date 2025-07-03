<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingColumnsToNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Add 'type' column if it doesn't exist
            if (!Schema::hasColumn('notifications', 'type')) {
                $table->string('type')->nullable()->after('user_id'); // Position after user_id
            }

            // Add 'data' column if it doesn't exist
            if (!Schema::hasColumn('notifications', 'data')) {
                $table->json('data')->nullable()->after('message'); // Position after message
            }

            // Add 'read_at' column if it doesn't exist
            if (!Schema::hasColumn('notifications', 'read_at')) {
                $table->timestamp('read_at')->nullable()->after('is_read'); // Position after is_read
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Drop the columns if the migration is rolled back
            if (Schema::hasColumn('notifications', 'type')) {
                $table->dropColumn('type');
            }
            if (Schema::hasColumn('notifications', 'data')) {
                $table->dropColumn('data');
            }
            if (Schema::hasColumn('notifications', 'read_at')) {
                $table->dropColumn('read_at');
            }
        });
    }
}
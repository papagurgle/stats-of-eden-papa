/*
  Warnings:

  - A unique constraint covering the columns `[playerPlayFabId,createdAt]` on the table `PlayerSnapshot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerSnapshot_playerPlayFabId_createdAt_key" ON "PlayerSnapshot"("playerPlayFabId", "createdAt");

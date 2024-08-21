<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Arr;
use RuntimeException;

class BaseService
{
    use DispatchesJobs;

    public function getModel(): Model
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getQuery(?array $filters = []): ?Builder
    {
        return $this
            ->getModel()
            ->query();
    }

    //    /**
    //     * @param null $keyword
    //     * @return \Illuminate\Database\Eloquent\Builder
    //     */
    //    public function search($keyword = null): Builder
    //    {
    //        return $this
    //            ->getQuery()
    //            ->where(fn(Builder $builder) => $builder->search($keyword));
    //    }

    /**
     * @param  int|string|array|mixed  $value
     * @return Builder[]|Collection
     */
    public function findBy(string $key, mixed $value, array $withRelations = []): Collection|array
    {
        return $this
            ->getQuery()
            ->when(
                is_array($value),
                fn (Builder $builder) => $builder->whereIn(
                    $key,
                    Arr::wrap($value)
                ),
                fn (Builder $builder) => $builder->where(
                    $key,
                    $value
                )
            )
            ->with($withRelations)
            ->get();
    }

    public function findById(int $id, array $columns = ['*']): Collection|Model|array
    {
        return $this->find($id, $columns);
    }

    /**
     * @return Builder[]|Collection
     */
    public function findByIds(array $id, array $columns = ['*']): Collection|array
    {
        return $this->getQuery()->find(Arr::wrap($id), $columns);
    }

    /**
     * @param  string[]  $columns
     *
     * @throws ModelNotFoundException<Model>
     */
    public function find(int $id, array $columns = ['*']): Model|Collection|null
    {
        return $this
            ->getQuery()
            ->findOrFail($id, $columns);
    }

    /**
     * @throws Exception
     */
    public function dropdown(array $data = []): \Illuminate\Support\Collection
    {
        return $this->getQuery()->pluck('name', 'id');
    }

    public function fireModelEvent($event, $subject): void
    {
        event("eloquent.$event: ".get_class($this->getModel()), $subject);
    }
}

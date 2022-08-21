<?php

namespace App\Entity;

use App\Repository\PoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;


/**
 * @ORM\Entity(repositoryClass=PoleRepository::class)
 */
class Pole
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"departement"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"departement"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=CooptedEntity::class, inversedBy="pole")
     * @Serializer\Groups({"departement"})
     */
    private $cooptedEntity;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="pole")
     */
    private $users;



    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->cooptations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCooptedEntity(): ?CooptedEntity
    {
        return $this->cooptedEntity;
    }

    public function setCooptedEntity(?CooptedEntity $cooptedEntity): self
    {
        $this->cooptedEntity = $cooptedEntity;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setPole($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getPole() === $this) {
                $user->setPole(null);
            }
        }

        return $this;
    }

}

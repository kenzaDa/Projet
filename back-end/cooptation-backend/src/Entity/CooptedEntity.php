<?php

namespace App\Entity;

use App\Repository\CooptedEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CooptedEntityRepository::class)
 */
class CooptedEntity
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Serializer\Groups({"cooptations","cooptedEntity","departement"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Serializer\Groups({"cooptations","cooptedEntity"})
     */
    private $name;

 

    /**
     * @ORM\OneToMany(targetEntity=Pole::class, mappedBy="cooptedEntity")
     * @Assert\NotBlank
     */
    private $pole;

    /**
     * @ORM\OneToMany(targetEntity=Cooptation::class, mappedBy="coopted_entity")
     * @Serializer\Groups({"cooptations","cooptedEntity"})
     */
    private $coopted_entity;

    public function __construct()
    {
        $this->cooptations = new ArrayCollection();
        $this->pole = new ArrayCollection();
        $this->coopted_entity = new ArrayCollection();
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



    /**
     * @return Collection<int, Pole>
     */
    public function getPole(): Collection
    {
        return $this->pole;
    }

    public function addPole(Pole $pole): self
    {
        if (!$this->pole->contains($pole)) {
            $this->pole[] = $pole;
            $pole->setCooptedEntity($this);
        }

        return $this;
    }

    public function removePole(Pole $pole): self
    {
        if ($this->pole->removeElement($pole)) {
            // set the owning side to null (unless already changed)
            if ($pole->getCooptedEntity() === $this) {
                $pole->setCooptedEntity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Cooptation>
     */
    public function getCooptedEntity(): Collection
    {
        return $this->coopted_entity;
    }

    public function addCooptedEntity(Cooptation $cooptedEntity): self
    {
        if (!$this->coopted_entity->contains($cooptedEntity)) {
            $this->coopted_entity[] = $cooptedEntity;
            $cooptedEntity->setCooptedEntity($this);
        }

        return $this;
    }

    public function removeCooptedEntity(Cooptation $cooptedEntity): self
    {
        if ($this->coopted_entity->removeElement($cooptedEntity)) {
            // set the owning side to null (unless already changed)
            if ($cooptedEntity->getCooptedEntity() === $this) {
                $cooptedEntity->setCooptedEntity(null);
            }
        }

        return $this;
    }
}
